import pMap from 'p-map';

import fileExists from './fileExists';
import allSameWith from './allSameWith';

/**
 * 所有的文件都存在，返回 `true`
 * 如果有文件不存在，或全部都不存在，返回 `false`
 *
 * @param {Array} files - 待检测的文件列表
 * @returns {Boolean}
 */
const filesExists = async (files) => (
  allSameWith(
    await pMap(
      files,
      async path => {
        return await fileExists(path);
      },
      {concurrency: 4},
    ),

    true,
  )
);

export default filesExists;
