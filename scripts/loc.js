const path = require('path');

const Tokei = require('tokei-js');
const writeFileAtomic = require('write-file-atomic');
const chalk = require('chalk');
const gradient = require('gradient-string');

const { docs, appDirectory } = require('./paths');

// 待办： 终端输出界面
class Loc {
  constructor(options) {
    const tokei = new Tokei({
      format: 'json',
      exclude: ['esm', 'scripts', '*.md', '*.json', '*.hbs'],
    });

    this.options = Object.assign({}, {
      from: process.cwd(),
      dest: process.cwd(),
    }, options);

    this.lines = {
      count: 0,
      addCount: function(count) {
        this.count += count;
      }
    };

    this.files = Object.assign({}, this.lines, {
      reports: [],
      addReport: function(description) {
        this.reports.push(description);
      },
    });

    this.extractFromTokei(
      JSON.parse(tokei.locSync(this.options.from)).inner,
    );
  }

  md() {
    const shellFiles = [];
    const markdown = [
      this.stripEachLineIndent(`
        ![](https://img.shields.io/badge/代码量（平均/总数）-${this.average()}/${this.lines.count}-green.svg?style=flat)

        ${this.files.count} 份代码文件，总共 ${this.lines.count} 行代码：\n`
      ).trimLeft('\n'),
    ];

    for (let fileReport of this.files.reports) {
      markdown.push(`- \`${fileReport.file}\`, **${fileReport.loc}** 行`);
      shellFiles.push(
        chalk.grey(`- \`${fileReport.file}\`, ${fileReport.loc} 行`)
      );
    }

    writeFileAtomic(
      this.options.dest,
      markdown.join('\n'),
      {},
      (err) => {
        if (!err) {
          const str = (chalk `
            {bold ${gradient.rainbow('代码行数分析报告，已生成!')}}

            {grey 保存位置：}
            {grey ${this.options.dest}}

            {grey ${this.files.count} 份代码文件，总共 ${this.lines.count} 行代码：}
            ${shellFiles.join('\n')}
          `);

          console.log(this.stripEachLineIndent(str));
          return;
        }

        throw err;
      }
    );
  }

  stripEachLineIndent(string) {
    return (string.split('\n').map(value => {
      const match = value.match(/^[ \t]*(?=\S)/g);

      if (!this.isNil(match)) {
        const regex = new RegExp(`^[ \\t]{${match[0].length}}`, 'g');
        return value.replace(regex, '');
      } else {
        return '';
      }
    })).join('\n');
  }

  isNil(obj) {
    return obj == null;
  }

  average() {
    return Math.round(this.lines.count / this.files.count);
  }

  extractFromTokei(tokeiReport) {
    for (let langPivot in tokeiReport) {
      const currentLanuage = tokeiReport[langPivot];

      this.lines.addCount(
        this.numberofAllLinesForOneLanguage(currentLanuage),
      );

      this.files.addCount(
        this.numberOfilesForOneLanguage(currentLanuage),
      );

      for (let file of currentLanuage.stats) {
        this.files.addReport({
          file: path.relative(appDirectory, file.name),
          loc: file.code,
        });
      }
    }
  }

  numberofAllLinesForOneLanguage(language) {
    return language.code;
  }

  numberOfilesForOneLanguage(language) {
    return language.stats.length;
  }
}

(() => {
  const loc = new Loc({
    dest: path.join(docs, './loc.md'),
  });
  loc.md();
})();
