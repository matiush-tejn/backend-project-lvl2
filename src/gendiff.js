import { has, union } from 'lodash';
import getParsedData from './parse';

const buildDiffNodes = (data1, data2) => {
  const keys = union(Object.keys(data1), Object.keys(data2));
  return keys.map((key) => {
    if (has(data1, key) && !has(data2, key)) return { type: 'deleted', key, value: data1[key] };
    if (!has(data1, key) && has(data2, key)) return { type: 'added', key, value: data2[key] };
    if (data1[key] === data2[key]) return { type: 'equal', key, value: data1[key] };
    return { type: 'changed', key, value: [data1[key], data2[key]] };
  });
};

const renderer = (nodes) => {
  const result = nodes.reduce((acc, { type, key, value }) => {
    if (type === 'deleted') return { ...acc, [`- ${key}`]: value };
    if (type === 'added') return { ...acc, [`+ ${key}`]: value };
    if (type === 'equal') return { ...acc, [`  ${key}`]: value };
    return { ...acc, [`- ${key}`]: value[0], [`+ ${key}`]: value[1] };
  }, {});
  return JSON.stringify(result, null, ' ').split('').filter((char) => char !== '"').join('');
};

export default (filepath1, filepath2) => {
  const parsedData1 = getParsedData(filepath1);
  const parsedData2 = getParsedData(filepath2);
  const diffNodes = buildDiffNodes(parsedData1, parsedData2);
  return renderer(diffNodes);
};
