#!/usr/bin/env node

import meow from 'meow';
import updateNotifier from 'update-notifier';
import chalk from 'chalk';

import gitin from './gitin';

(async () => {
  try {
    const cli = meow(`
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
          alias: 'f',
        },
        help: {
          type: 'boolean',
          alias: 'h',
        }
      },
    });

    const { input, flags } = cli;
    const { force } = flags;

    updateNotifier({ pkg: cli.pkg }).notify();

    if (input.length === 0) {
      throw Error('必须提供初始化位置');
    }

    if (input.length > 1) {
      throw Error('暂时不支持批量初始化');
    }

    const rslt = await gitin(input[0], force);

    console.log(`
     ${chalk.greenBright(rslt.message)}
    `);
  } catch (err) {
    throw err;
  }
})();
