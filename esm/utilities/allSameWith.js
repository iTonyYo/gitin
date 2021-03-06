"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _every = _interopRequireDefault(require("lodash/every"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const allSameWith = (collection, as) => (0, _every.default)(collection, i => (0, _fastDeepEqual.default)(i, as));

var _default = allSameWith;
exports.default = _default;
module.exports = exports.default;