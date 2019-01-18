import { join } from 'path';

import { Repository } from 'nodegit';
import debug from 'debug';
import trash from 'trash';
import isBoolean from 'lodash/isBoolean';
import isEqual from 'fast-deep-equal';

import isGitRepo from './isGitRepo';
import dirExists from './dirExists';

const log = debug('GITIN:log');

const gitin = async (path, force) => {
  try {
    if (!(await dirExists(path))) {
      throw Error('必须提供有效的初始化位置');
    }

    const isGit = await isGitRepo(path);
    const isForce = isBoolean(force) && isEqual(force, true);

    if (isGit && !isForce) {
      log('当前项目已经是 Git 项目');
      return {
        state: 'already',
        message: '当前项目已经是 Git 项目',
      };
    }

    if (isGit && isForce) {
      await trash(join(path, '.git'));
      log('强制重新初始化 Git 项目');

      await Repository.init(path, 0);
      log('成功初始化 Git 项目');

      return {
        state: 'success',
        message: '成功强制重新初始化 Git 项目',
      };
    }

    await Repository.init(path, 0);
    log('成功初始化 Git 项目');

    return {
      state: 'success',
      message: '成功初始化 Git 项目',
    };
  } catch (err) {
    throw err.toString();
  }
};

export default gitin;
