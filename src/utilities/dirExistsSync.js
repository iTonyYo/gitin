import { statSync } from 'fs';

const dirExistsSync = (filepath) => {
  if (typeof filepath !== 'string') {
    throw new Error('文件路径必须是字符串');
  }

  try {
    const stat = statSync(filepath);
    return stat.isDirectory();
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }

    throw err;
  }
};

export default dirExistsSync;
