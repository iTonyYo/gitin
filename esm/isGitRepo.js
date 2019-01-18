"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _resolveRoot = _interopRequireDefault(require("./resolveRoot"));

var _filesExists = _interopRequireDefault(require("./filesExists"));

var _dirsExists = _interopRequireDefault(require("./dirsExists"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * https://git.io/fhC0r，https://goo.gl/GU35Ee
 * https://goo.gl/hoxtVz，https://goo.gl/LjRm9c
 * 这些是检测当前项目是不是 Git 项目的方法，但都有个
 * 前提，就是系统已安装 Git，通过 Git 提供的指令检
 * 测。
 *
 * `git init` 后，会生成包括默认结构的 `.git` 文
 * 件夹，通过删除其中部分空文件夹的做法，可以确认的是，
 * 通过上面的办法，Git 自身会检查 `.git` 文件夹内
 * 默认结构是否完整，进而得出当前项目是不是 Git 项目。
 *
 * 检测项目根目录是否存在 `.git` 文件夹，进而得出当
 * 前项目是不是 Git 项目。这是其它项目的做法。根据前
 * 面的描述，这样的做法是不妥当的。
 *
 * https://goo.gl/Jg4Y4K 这里解释了一个全新
 * `git init` 版本库默认结构。
 *
 * 综上述，得出 `isGitRepo()` 的设计，
 * - [X] 不需要系统安装 Git
 * - [X] 通过检查版本库默认结构来判断
 */
const gitInitFile = [(0, _resolveRoot.default)('.git/HEAD'), (0, _resolveRoot.default)('.git/config'), (0, _resolveRoot.default)('.git/description')];
const gitInitDir = [(0, _resolveRoot.default)('.git/hooks'), (0, _resolveRoot.default)('.git/info'), (0, _resolveRoot.default)('.git/objects'), (0, _resolveRoot.default)('.git/objects/info'), (0, _resolveRoot.default)('.git/objects/pack'), (0, _resolveRoot.default)('.git/refs'), (0, _resolveRoot.default)('.git/refs/heads'), (0, _resolveRoot.default)('.git/refs/tags')];

var _default = async () => {
  const fe = (0, _filesExists.default)(gitInitFile);
  const de = (0, _dirsExists.default)(gitInitDir);
  return (await fe) && (await de) ? true : false;
};

exports.default = _default;
module.exports = exports.default;