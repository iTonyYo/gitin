import every from 'lodash/every';
import isEqual from 'fast-deep-equal';

const allSameWith = (collection, as) => (
  every(collection, i => isEqual(i, as))
);

export default allSameWith;
