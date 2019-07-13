"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _meow = _interopRequireDefault(require("meow"));

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _chalk = _interopRequireDefault(require("chalk"));

var _gradientString = _interopRequireDefault(require("gradient-string"));

var _debug = _interopRequireDefault(require("debug"));

var _package = _interopRequireDefault(require("../package.json"));

var _gitin = _interopRequireDefault(require("./gitin"));

var _getWorkingDirectory = _interopRequireDefault(require("./utilities/getWorkingDirectory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Cli {
  constructor() {
    (0, _updateNotifier.default)({
      pkg: _package.default
    }).notify();
    this.cli = (0, _meow.default)(`
      使用方式
        $ gitin <位置> 选项 [...]

      选项
        --new, -n,             新建不存在的目标目录
        --force, -f,           强制重新初始化，注意：这会删除已有的 ".git" 目录
        --version, -V,         查看版本号

      示例
        $ gitin                将当前文件夹初始化为 Git 仓库
        $ gitin /usr/project   指定文件夹并将其初始化为 Git 仓库
        $ gitin -f             强制重新初始化当前所在 Git 仓库
    `, {
      flags: {
        new: {
          type: 'boolean',
          alias: 'n'
        },
        force: {
          type: 'boolean',
          alias: 'f'
        },
        help: {
          type: 'boolean',
          alias: 'h'
        },
        version: {
          type: 'boolean',
          alias: 'V'
        }
      }
    });
    this.flags = this.cli.flags;
    this.workingPath = (0, _getWorkingDirectory.default)(this.cli.input[0]).twd;
    this.log = (0, _debug.default)('GITIN:cli');
  }

  async run() {
    this.hint((await (0, _gitin.default)(this.workingPath, {
      force: this.flags.force,
      newDir: this.flags.new
    })));
  }

  hint(rslt) {
    const stdout = [];
    stdout.push(_chalk.default`\n{bold ${_gradientString.default.rainbow(rslt.message)}} \n`);

    if (this.cli.input.length > 1) {
      stdout.push(_chalk.default`{yellow 警告：\n暂时不支持批量操作。}\n`);
    }

    console.log(stdout.join('\n'));
  }

}

var _default = Cli;
exports.default = _default;
module.exports = exports.default;