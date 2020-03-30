import { has, union } from 'lodash';

const buildAst = (data1, data2) => {
  const nodeTypes = [
    {
      type: 'deleted',
      predicate: (key) => has(data1, key) && !has(data2, key),
      getData: (key) => data1[key],
    },
    {
      type: 'added',
      predicate: (key) => !has(data1, key) && has(data2, key),
      getData: (key) => data2[key],
    },
    {
      type: 'nested',
      predicate: (key) => data1[key] instanceof Object && data2[key] instanceof Object,
      getData: (key) => buildAst(data1[key], data2[key]),
    },
    {
      type: 'equal',
      predicate: (key) => data1[key] === data2[key],
      getData: (key) => data1[key],
    },
    {
      type: 'changed',
      predicate: (key) => data1[key] !== data2[key],
      getData: (key) => [data1[key], data2[key]],
    },
  ];
  const keys = union(Object.keys(data1), Object.keys(data2));
  return keys.map((key) => {
    const { type, getData } = nodeTypes.find(({ predicate }) => predicate(key));
    return { type, key, data: getData(key) };
  });
};

export default buildAst;
