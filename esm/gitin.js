"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _nodegit = require("nodegit");

var _trash = _interopRequireDefault(require("trash"));

var _makeDir = _interopRequireDefault(require("make-dir"));

var _debug = _interopRequireDefault(require("debug"));

var _merge = _interopRequireDefault(require("./utilities/merge"));

var _isBoolean = _interopRequireDefault(require("./utilities/isBoolean"));

var _isEqual = _interopRequireDefault(require("./utilities/isEqual"));

var _isGitRepo = _interopRequireDefault(require("./utilities/isGitRepo"));

var _dirExistsSync = _interopRequireDefault(require("./utilities/dirExistsSync"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _debug.default)('GITIN:gitin');

const gitin = async (path, options = {}) => {
  try {
    if (!newDir) {
      throw Error('必须提供有效的初始化位置');
    }

    const {
      force,
      newDir
    } = (0, _merge.default)({
      force: false,
      newDir: false
    }, options);

    if (!(0, _dirExistsSync.default)(path) && newDir) {
      await (0, _makeDir.default)(path);
    }

    const isGit = await (0, _isGitRepo.default)(path);
    const isForce = (0, _isBoolean.default)(force) && (0, _isEqual.default)(force, true);

    if (isGit && !isForce) {
      log(`\`${path}\` 项目已经是 Git 项目`);
      return {
        state: 'already',
        message: `\`${path}\` 项目已经是 Git 项目！`
      };
    }

    if (isGit && isForce) {
      await (0, _trash.default)((0, _path.join)(path, '.git'));
      log('强制重新初始化 Git 项目');
      await _nodegit.Repository.init(path, 0);
      log('成功初始化 Git 项目');
      return {
        state: 'success',
        message: '成功强制重新初始化 Git 项目！'
      };
    }

    await _nodegit.Repository.init(path, 0);
    log(`成功初始化 Git 项目 \`${path}\``);
    return {
      state: 'success',
      message: `成功初始化 Git 项目 \`${path}\`！`
    };
  } catch (err) {
    throw err;
  }
};

var _default = gitin;
exports.default = _default;
module.exports = exports.default;