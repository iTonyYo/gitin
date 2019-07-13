import { realpathSync } from 'fs';
import { resolve } from 'path';

const resolvePath = (relativePath, base) => resolve(
  realpathSync(base),
  relativePath,
);

export default resolvePath;
