import { has, union, identity } from 'lodash';

const nodeTypes = [
  {
    type: 'deleted',
    predicate: (key, data1, data2) => has(data1, key) && !has(data2, key),
    getData: identity,
  },
  {
    type: 'added',
    predicate: (key, data1, data2) => !has(data1, key) && has(data2, key),
    getData: (nonexistent, value) => value,
  },
  {
    type: 'nested',
    predicate: (key, data1, data2) => data1[key] instanceof Object && data2[key] instanceof Object,
    getData: (nested1, nested2, buildAst) => buildAst(nested1, nested2),
  },
  {
    type: 'equal',
    predicate: (key, data1, data2) => data1[key] === data2[key],
    getData: identity,
  },
  {
    type: 'changed',
    predicate: (key, data1, data2) => data1[key] !== data2[key],
    getData: (value1, value2) => [value1, value2],
  },
];

const buildAst = (data1, data2) => {
  const keys = union(Object.keys(data1), Object.keys(data2));
  return keys.map((key) => {
    const { type, getData } = nodeTypes.find(({ predicate }) => predicate(key, data1, data2));
    return { type, key, data: getData(data1[key], data2[key], buildAst) };
  });
};

export default buildAst;
