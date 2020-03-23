import { has, union } from 'lodash';
import getParsedData from './parse';

const compare = (data1, data2) => {
  const keys = union(Object.keys(data1), Object.keys(data2));
  const result = keys.reduce((acc, key) => {
    if (has(data1, key) && !has(data2, key)) return { ...acc, [`- ${key}`]: data1[key] };
    if (!has(data1, key) && has(data2, key)) return { ...acc, [`+ ${key}`]: data2[key] };
    if (data1[key] === data2[key]) return { ...acc, [`  ${key}`]: data1[key] };
    return { ...acc, [`+ ${key}`]: data1[key], [`- ${key}`]: data2[key] };
  }, {});
  return JSON.stringify(result, null, ' ').split('').filter((char) => char !== '"').join('');
};

export default (filepath1, filepath2) => {
  const parsedData1 = getParsedData(filepath1);
  const parsedData2 = getParsedData(filepath2);
  return compare(parsedData1, parsedData2);
};
