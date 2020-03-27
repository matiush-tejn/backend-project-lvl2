import { has, union } from 'lodash';

const buildAst = (data1, data2) => {
  const predicates = {
    deleted: (key) => has(data1, key) && !has(data2, key),
    added: (key) => !has(data1, key) && has(data2, key),
    nested: (key) => data1[key] instanceof Object && data2[key] instanceof Object,
    equal: (key) => data1[key] === data2[key],
    changed: (key) => data1[key] !== data2[key],
  };
  const getType = (key) => Object.keys(predicates).find((type) => predicates[type](key));
  const keys = union(Object.keys(data1), Object.keys(data2));
  return keys.map((key) => {
    const type = getType(key);
    const children = type === 'nested' ? buildAst(data1[key], data2[key]) : [];
    return [type, key, data1[key], data2[key], children];
  });
};

export default buildAst;
