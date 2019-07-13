"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

const dirExistsSync = filepath => {
  if (typeof filepath !== 'string') {
    throw new Error('文件路径必须是字符串');
  }

  try {
    const stat = (0, _fs.statSync)(filepath);
    return stat.isDirectory();
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }

    throw err;
  }
};

var _default = dirExistsSync;
exports.default = _default;
module.exports = exports.default;