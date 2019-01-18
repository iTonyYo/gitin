import pMap from 'p-map';

import dirExists from './dirExists';
import allSameWith from './allSameWith';

/**
 * 所有的文件夹都存在，返回 `true`
 * 如果有文件夹不存在，或全部都不存在，返回 `false`
 *
 * @param {Array} dirs - 待检测的文件夹列表
 * @returns {Boolean}
 */
const dirsExists = async (dirs) => (
  allSameWith(
    await pMap(
      dirs,
      async path => {
        return await dirExists(path);
      },
      {concurrency: 4},
    ),

    true,
  )
);

export default dirsExists;
