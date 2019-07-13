import { join } from 'path';

import { Repository } from 'nodegit';
import trash from 'trash';
import isBoolean from 'lodash/isBoolean';
import isEqual from 'fast-deep-equal';
import debug from 'debug';

import isGitRepo from './utilities/isGitRepo';
import dirExistsSync from './utilities/dirExistsSync';

const log = debug('GITIN:gitin');

const gitin = async (path, force) => {
  try {
    if (!dirExistsSync(path)) {
      throw Error('必须提供有效的初始化位置');
    }

    const isGit = await isGitRepo(path);
    const isForce = isBoolean(force) && isEqual(force, true);

    if (isGit && !isForce) {
      log(`\`${path}\` 项目已经是 Git 项目`);
      return {
        state: 'already',
        message: `\`${path}\` 项目已经是 Git 项目！`,
      };
    }

    if (isGit && isForce) {
      await trash(join(path, '.git'));
      log('强制重新初始化 Git 项目');

      await Repository.init(path, 0);
      log('成功初始化 Git 项目');

      return {
        state: 'success',
        message: '成功强制重新初始化 Git 项目！',
      };
    }

    await Repository.init(path, 0);
    log('成功初始化 Git 项目');

    return {
      state: 'success',
      message: '成功初始化 Git 项目！',
    };
  } catch (err) {
    throw err;
  }
};

export default gitin;
