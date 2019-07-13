[![Maintainability](https://api.codeclimate.com/v1/badges/c0ae01504ec1e82bd958/maintainability)](https://codeclimate.com/github/iTonyYo/gitin/maintainability)

# `@oopsunome/gitin`

初始化 Git 仓库。

## 目录

- [`gitin(path, force)`](#gitinpath-force)
- [命令行](#命令行)
- [参与开发](#参与开发)
- [贡献指南](#贡献指南)
- [证书](#证书)

## `gitin(path, force)`

- `mark` {String} 初始化位置
- `force` {Boolean} 强制重新初始化, **注意:** 这会删除已有的 `.git` 目录
- 返回: {Object}
  - `state` {String} 初始化状态, `already` 表示当前项目已经是 Git 仓库, `success` 表示初始化成功
  - `message` {String} 初始化结果陈述

#### 功能

:heavy_check_mark: 持辨别是否已经是 Git 仓库

:heavy_check_mark: 可强制删除已有的 ".git" 目录，重新初始化 Git

#### 安装

```shell
# 使用 NPM
$ npm i @oopsunome/gitin

# 使用 Yarn
$ yarn add @oopsunome/gitin
```

#### 使用

```javascript
import gitin from '@oopsunome/gitin';

(async () => {
  const inited = gitin('.');
  await inited;

  /**
   * inited:
   *
   * {
   *   state: 'success',
   *   message: '成功初始化 Git 仓库'
   * }
   */
})();
```

## 命令行

:heavy_check_mark: 支持从当前以及指定目录初始化 Git 仓库

:heavy_check_mark: 持辨别是否已经是 Git 仓库

:heavy_check_mark: 可强制删除已有的 ".git" 目录，重新初始化 Git 仓库

#### 安装

在全局系统环境下使用的话，需要先全局安装 [@oopsunome/gitin][@oopsunome/gitin]，

```shell
# 使用 NPM
$ npm i -g @oopsunome/gitin

# 使用 Yarn
$ yarn global add @oopsunome/gitin
```

#### 使用

```
使用方式
  $ gitin <位置> 选项 [...]

选项
  --force, -f,           强制重新初始化，注：这会删除已有的 ".git" 目录
  --version, -V,         查看版本号

示例
  $ gitin                将当前文件夹初始化为 Git 仓库
  $ gitin /usr/project   指定文件夹并将其初始化为 Git 仓库
  $ gitin -f             强制重新初始化当前所在 Git 仓库
```

## 参与开发

**准备开发环境**

详细参见 [SETUP.md][SETUP.md]。

**安装依赖**

[`@oopsunome/gitin`][@oopsunome/gitin] 使用 [`npm`](https://www.npmjs.com/) 包管理器，执行 `npm i` 安装依赖。

**运行**

```shell
npm start
```

**生产构建**

```shell
npm build
```

**测试**

```shell
npm test
```

## 贡献指南

仔细查阅 [CONTRIBUTING.md][贡献指南] 以了解详情。

## 证书

[`@oopsunome/gitin`][@oopsunome/gitin] 获得了 MIT 许可，仔细查阅 [LICENSE.md][证书] 以了解详情。



[贡献指南]: https://github.com/iTonyYo/gitin/blob/master/CONTRIBUTING.md
[证书]: https://github.com/iTonyYo/gitin/blob/master/LICENSE.md
[Node]: https://nodejs.org/
[@oopsunome/gitin]: https://github.com/iTonyYo/gitin
[SETUP.md]: #
