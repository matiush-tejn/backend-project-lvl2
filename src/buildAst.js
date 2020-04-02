import { has, union, identity } from 'lodash';

const nodeTypes = [
  {
    type: 'deleted',
    predicate: (key, oldData, newData) => has(oldData, key) && !has(newData, key),
    getValue: identity,
  },
  {
    type: 'added',
    predicate: (key, oldData, newData) => !has(oldData, key) && has(newData, key),
    getValue: (nonexistent, newValue) => newValue,
  },
  {
    type: 'nested',
    predicate: (key, oldData, newData) => (
      oldData[key] instanceof Object && newData[key] instanceof Object),
    getValue: (oldValue, newValue, buildAst) => buildAst(oldValue, newValue),
  },
  {
    type: 'equal',
    predicate: (key, oldData, newData) => oldData[key] === newData[key],
    getValue: identity,
  },
  {
    type: 'changed',
    predicate: (key, oldData, newData) => oldData[key] !== newData[key],
    getValue: (oldValue, newValue) => [oldValue, newValue],
  },
];

const buildAst = (oldData, newData) => {
  const keys = union(Object.keys(oldData), Object.keys(newData));
  return keys.map((key) => {
    const { type, getValue } = nodeTypes.find(({ predicate }) => predicate(key, oldData, newData));
    return { type, key, value: getValue(oldData[key], newData[key], buildAst) };
  });
};

export default buildAst;
