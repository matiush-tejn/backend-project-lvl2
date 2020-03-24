import { has, union } from 'lodash';
import getParsedData from './parse';
import renderer from './renderer';

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

export default (filepath1, filepath2) => {
  const parsedData1 = getParsedData(filepath1);
  const parsedData2 = getParsedData(filepath2);
  const diffNodes = buildDiffNodes(parsedData1, parsedData2);
  return renderer(diffNodes);
};
