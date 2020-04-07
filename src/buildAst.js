import { has, union } from 'lodash';

const getValues = (oldValue, newValue) => ({ oldValue, newValue });
const getChildren = (oldValue, newValue, buildAst) => ({ children: buildAst(oldValue, newValue) });

const nodeTypes = [
  {
    type: 'deleted',
    definition: (key, oldData, newData) => has(oldData, key) && !has(newData, key),
    getNodeData: getValues,
  },
  {
    type: 'added',
    definition: (key, oldData, newData) => !has(oldData, key) && has(newData, key),
    getNodeData: getValues,
  },
  {
    type: 'nested',
    definition: (key, oldData, newData) => (
      oldData[key] instanceof Object && newData[key] instanceof Object),
    getNodeData: getChildren,
  },
  {
    type: 'equal',
    definition: (key, oldData, newData) => oldData[key] === newData[key],
    getNodeData: getValues,
  },
  {
    type: 'changed',
    definition: (key, oldData, newData) => oldData[key] !== newData[key],
    getNodeData: getValues,
  },
];

const buildAst = (oldData, newData) => {
  const buildNode = (key) => {
    const { type, getNodeData } = nodeTypes
      .find(({ definition }) => definition(key, oldData, newData));
    return { type, key, ...getNodeData(oldData[key], newData[key], buildAst) };
  };

  const keys = union(Object.keys(oldData), Object.keys(newData));
  return keys.map(buildNode);
};

export default buildAst;
