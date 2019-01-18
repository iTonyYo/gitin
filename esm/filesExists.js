"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pMap = _interopRequireDefault(require("p-map"));

var _fileExists = _interopRequireDefault(require("./fileExists"));

var _allSameWith = _interopRequireDefault(require("./allSameWith"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 所有的文件都存在，返回 `true`
 * 如果有文件不存在，或全部都不存在，返回 `false`
 *
 * @param {Array} files - 待检测的文件列表
 * @returns {Boolean}
 */
const filesExists = async files => (0, _allSameWith.default)((await (0, _pMap.default)(files, async path => {
  return await (0, _fileExists.default)(path);
}, {
  concurrency: 4
})), true);

var _default = filesExists;
exports.default = _default;
module.exports = exports.default;