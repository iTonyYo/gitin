import every from 'lodash/every';

const allSameWith = (collection, as) => (
  every(collection, (i) => (i === as))
);

export default allSameWith;
