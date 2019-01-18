# `@oopsunome/gitin`

初始化 Git 项目。

## 目录

- [功能](#功能)
- [安装](#安装)
- [使用](#使用)
    - [`gitin(path, force)`](#gitinpath-force)
    - [命令行](#命令行)
- [参与开发](#参与开发)
- [贡献指南](#贡献指南)
- [证书](#证书)
- [待办](#待办)

## 功能

:heavy_check_mark: 支持从空文件夹内初始化 Git 项目

:heavy_check_mark: 支持辨别是否已经是 Git 项目

:heavy_check_mark: 支持强制删除已有的 ".git" 目录，重新初始化 Git

## 安装

```shell
# 使用 NPM
$ npm i @oopsunome/gitin

# 使用 Yarn
$ yarn add @oopsunome/gitin
```

## 使用

#### `gitin(path, force)`

- `mark` {String} 初始化位置
- `force` {Boolean} 强制重新初始化, **注意:** 这会删除已有的 `.git` 目录
- 返回: {Object}
  - `state` {String} 初始化状态, `already` 表示当前项目已经是 Git 项目, `success` 表示初始化成功
  - `message` {String} 初始化结果陈述

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
   *   message: '成功初始化 Git 项目'
   * }
   */
})();
```

#### 命令行

```
$ 使用方式
    gitin <位置> 选项 [...]

  选项
    --force, -f, 强制重新初始化，注意：这会删除已有的 ".git" 目录

  示例
    $ gitin .
```

在全局系统环境下使用的话，需要先全局安装 [@oopsunome/gitin][@oopsunome/gitin]，

```shell
# 使用 NPM
$ npm i -g @oopsunome/gitin

# 使用 Yarn
$ yarn global add @oopsunome/gitin
```

## 参与开发

**准备开发环境**

详细参见 [SETUP.md][SETUP.md]。

**安装依赖**

[`@oopsunome/gitin`][@oopsunome/gitin] 使用 [`Yarn`](https://yarnpkg.com/zh-Hans/) 包管理器，执行 `yarn install` 安装依赖。

**运行**

```shell
yarn start
```

**生产构建**

```shell
yarn build
```

**测试**

```shell
yarn test
```

## 贡献指南

仔细查阅 [CONTRIBUTING.md][贡献指南] 以了解详情。

## 证书

[`@oopsunome/gitin`][@oopsunome/gitin] 获得了 MIT 许可，仔细查阅 [LICENSE.md][证书] 以了解详情。

## 待办

- [X] 开发的时候使用 `ES 6/7`，支持构建 `ES 5` 模式的模块；
- [ ] 功能测试；
- [ ] 捆绑 [Git 倒钩][Git倒钩]；
- [X] ESlint 检测；
- [X] 生成所有依赖的开源证书；
- [X] 更新日志；
- [ ] 谁在使用 [`@oopsunome/gitin`][@oopsunome/gitin]?
- [ ] 编写 [发布流程指南][发布流程指南]；
- [ ] 编写 [Git 指南][Git指南]；
- [ ] 编写 [命名指南][命名指南]；
- [ ] 编写 [版本指南][版本指南]；
- [ ] 完善 [贡献指南][贡献指南]；
- [ ] 文档：[编码风格指南][编码风格指南]；
- [ ] 使用 [David DM][DavidDM] 实现 `依赖是否最新` 检测；
- [ ] 使用 [Travis CI][TravisCI] 实现持续集成；
- [ ] 使用 [Coveralls][Coveralls] 可视化测试用例覆盖率；
- [ ] 使用 [Codacy][Codacy] 实现代码质量检测；
- [ ] 编写 [开发环境指南][SETUP.md]；
- [ ] 在什么场景下使用 [`@oopsunome/gitin`][@oopsunome/gitin]?
- [ ] 文档：在哪里可以获得更多帮助？
- [ ] 文档：设计思想；
- [ ] 文档：维护策略；
- [ ] 性能测试；



[编码风格指南]: #
[版本指南]: #
[命名指南]: #
[Git指南]: #
[发布流程指南]: #
[Git倒钩]: https://github.com/typicode/husky
[DavidDM]: https://david-dm.org/
[TravisCI]: https://travis-ci.org/
[Coveralls]: https://coveralls.io/
[Codacy]: https://www.codacy.com/
[贡献指南]: https://github.com/iTonyYo/gitin/blob/master/CONTRIBUTING.md
[证书]: https://github.com/iTonyYo/gitin/blob/master/LICENSE.md
[Node]: https://nodejs.org/
[@oopsunome/gitin]: https://github.com/iTonyYo/gitin
[SETUP.md]: #
