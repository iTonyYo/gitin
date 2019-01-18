"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pMap = _interopRequireDefault(require("p-map"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _dirExists = _interopRequireDefault(require("./dirExists"));

var _allSameWith = _interopRequireDefault(require("./allSameWith"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 所有的文件夹都存在，返回 `true`
 * 如果有文件夹不存在，或全部都不存在，返回 `false`
 *
 * @param {Array} dirs - 待检测的文件夹列表
 * @returns {Boolean}
 */
const dirsExists = async dirs => (0, _allSameWith.default)((await (0, _pMap.default)(dirs, async path => !(0, _fastDeepEqual.default)((await (0, _dirExists.default)(path)), false), {
  concurrency: 4
})), true);

var _default = dirsExists;
exports.default = _default;
module.exports = exports.default;