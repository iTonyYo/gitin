"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _nodegit = require("nodegit");

var _debug = _interopRequireDefault(require("debug"));

var _trash = _interopRequireDefault(require("trash"));

var _isBoolean = _interopRequireDefault(require("lodash/isBoolean"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _isGitRepo = _interopRequireDefault(require("./isGitRepo"));

var _dirExists = _interopRequireDefault(require("./dirExists"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _debug.default)('GITIN:log');

const gitin = async (path, force) => {
  try {
    if (!(await (0, _dirExists.default)(path))) {
      throw Error('必须提供有效的初始化位置');
    }

    const isGit = await (0, _isGitRepo.default)();
    const isForce = (0, _isBoolean.default)(force) && (0, _isEqual.default)(force, true);

    if (isGit && !isForce) {
      log('当前项目已经是 Git 项目');
      return {
        state: 'already',
        message: '当前项目已经是 Git 项目'
      };
    }

    if (isGit && isForce) {
      await (0, _trash.default)((0, _path.join)(path, '.git'));
      log('强制重新初始化 Git 项目');
      await _nodegit.Repository.init(path, 0);
      log('成功初始化 Git 项目');
      return {
        state: 'success',
        message: '成功强制重新初始化 Git 项目'
      };
    }

    if (!isGit) {
      await _nodegit.Repository.init(path, 0);
      log('成功初始化 Git 项目');
      return {
        state: 'success',
        message: '成功初始化 Git 项目'
      };
    }
  } catch (err) {
    throw err.toString();
  }
};

var _default = gitin;
exports.default = _default;
module.exports = exports.default;