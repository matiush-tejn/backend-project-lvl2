import { has, union, identity } from 'lodash';

const nodeTypes = [
  {
    type: 'deleted',
    definition: (key, oldData, newData) => has(oldData, key) && !has(newData, key),
    getValue: identity,
  },
  {
    type: 'added',
    definition: (key, oldData, newData) => !has(oldData, key) && has(newData, key),
    getValue: (nonexistent, newValue) => newValue,
  },
  {
    type: 'nested',
    definition: (key, oldData, newData) => (
      oldData[key] instanceof Object && newData[key] instanceof Object),
    getValue: (oldValue, newValue, buildAst) => buildAst(oldValue, newValue),
  },
  {
    type: 'equal',
    definition: (key, oldData, newData) => oldData[key] === newData[key],
    getValue: identity,
  },
  {
    type: 'changed',
    definition: (key, oldData, newData) => oldData[key] !== newData[key],
    getValue: (oldValue, newValue) => [oldValue, newValue],
  },
];

const buildAst = (oldData, newData) => {
  const getNodeType = (key) => nodeTypes
    .find(({ definition }) => definition(key, oldData, newData));

  const keys = union(Object.keys(oldData), Object.keys(newData));
  return keys.map((key) => {
    const { type, getValue } = getNodeType(key, oldData, newData);
    return { type, key, value: getValue(oldData[key], newData[key], buildAst) };
  });
};

export default buildAst;
