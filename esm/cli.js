"use strict";

var _meow = _interopRequireDefault(require("meow"));

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _chalk = _interopRequireDefault(require("chalk"));

var _gitin = _interopRequireDefault(require("./gitin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  try {
    const cli = (0, _meow.default)(`
      使用方式
      $ gitin <位置> 选项 [...]

      选项
        --force, -f, 强制重新初始化，注意：这会删除已有的 ".git" 目录

      示例
        $ gitin .
    `, {
      flags: {
        force: {
          type: 'boolean',
          alias: 'f'
        },
        help: {
          type: 'boolean',
          alias: 'h'
        }
      }
    });
    const {
      input,
      flags
    } = cli;
    const {
      force
    } = flags;
    (0, _updateNotifier.default)({
      pkg: cli.pkg
    }).notify();

    if (input.length === 0) {
      throw Error('必须提供初始化位置');
    }

    if (input.length > 1) {
      throw Error('暂时不支持批量初始化');
    }

    const rslt = await (0, _gitin.default)(input[0], force);
    console.log(`
     ${_chalk.default.greenBright(rslt.message)}
    `);
  } catch (err) {
    throw err;
  }
})();