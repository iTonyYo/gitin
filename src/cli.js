import meow from 'meow';
import updateNotifier from 'update-notifier';
import chalk from 'chalk';
import gradient from 'gradient-string';
import debug from 'debug';

import pkg from '../package.json';

import gitin from './gitin';
import getWorkingDirectory from './utilities/getWorkingDirectory';

class Cli {
  constructor() {
    updateNotifier({ pkg }).notify();

    this.cli = meow(`
      使用方式
        $ gitin <位置> 选项 [...]

      选项
        --new, -n,             新建不存在的目标目录
        --force, -f,           强制重新初始化，注意：这会删除已有的 ".git" 目录
        --version, -V,         查看版本号

      示例
        $ gitin                将当前文件夹初始化为 Git 仓库
        $ gitin /usr/pro       指定文件夹并将其初始化为 Git 仓库
        $ gitin -f             强制重新初始化当前所在 Git 仓库
        $ gitin /usr/pro -n    新建 \`/usr/pro\` 目录并将其初始化为 Git 仓库
    `, {
      flags: {
        new: {
          type: 'boolean',
          alias: 'n',
        },
        force: {
          type: 'boolean',
          alias: 'f',
        },
        help: {
          type: 'boolean',
          alias: 'h',
        },
        version: {
          type: 'boolean',
          alias: 'V',
        },
      },
    });

    this.flags = this.cli.flags;
    this.workingPath = getWorkingDirectory(this.cli.input[0]).twd;
    this.log = debug('GITIN:cli');
  }

  async run() {
    this.hint(
      await gitin(this.workingPath, {
        force: this.flags.force,
        newDir: this.flags.new,
      }),
    );
  }

  hint(rslt) {
    const stdout = [];

    stdout.push(
      (chalk`\n{bold ${gradient.rainbow(rslt.message)}} \n`),
    );

    if (this.cli.input.length > 1) {
      stdout.push(chalk`{yellow 警告：\n暂时不支持批量操作。}\n`);
    }

    console.log(stdout.join('\n'));
  }
}

export default Cli;
