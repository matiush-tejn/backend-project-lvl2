import { has, union } from 'lodash';
import getParsedData from './parse';

const buildDiffNodes = (data1, data2) => {
  const predicates = {
    deleted: (key) => has(data1, key) && !has(data2, key),
    added: (key) => !has(data1, key) && has(data2, key),
    equal: (key) => data1[key] === data2[key],
    changed: (key) => data1[key] !== data2[key],
  };
  const getType = (key) => Object.keys(predicates).find((type) => predicates[type](key));
  const keys = union(Object.keys(data1), Object.keys(data2));
  return keys.map((key) => [getType(key), key, data1[key], data2[key]]);
};

const renderer = (diffNodes) => {
  const result = diffNodes.reduce((acc, [type, key, firstValue, secondValue]) => {
    if (type === 'deleted') return { ...acc, [`- ${key}`]: firstValue };
    if (type === 'added') return { ...acc, [`+ ${key}`]: secondValue };
    if (type === 'equal') return { ...acc, [`  ${key}`]: firstValue };
    return { ...acc, [`- ${key}`]: firstValue, [`+ ${key}`]: secondValue };
  }, {});
  return JSON.stringify(result, null, ' ').split('').filter((char) => char !== '"').join('');
};

export default (filepath1, filepath2) => {
  const parsedData1 = getParsedData(filepath1);
  const parsedData2 = getParsedData(filepath2);
  const diffNodes = buildDiffNodes(parsedData1, parsedData2);
  return renderer(diffNodes);
};
