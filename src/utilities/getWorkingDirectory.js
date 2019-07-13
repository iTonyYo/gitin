import isEmpty from './isEmpty';

export default twd => ({
  twd: isEmpty(twd) || twd === '.' || twd === './' ? process.cwd() : twd,
  cwd: process.cwd(),
});
