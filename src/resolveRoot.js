import { realpathSync } from 'fs';
import { resolve } from 'path';

const resolveRoot = relativePath => resolve(
  realpathSync(process.cwd()),
  relativePath,
);

export default resolveRoot;
