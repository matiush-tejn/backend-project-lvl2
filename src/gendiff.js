import { has } from 'lodash';
import getParsedData from './parse';

const compare = (data1, data2) => {
  const changed = Object.entries(data1).reduce((acc, [key, value]) => {
    if (!has(data2, key)) return { ...acc, [`- ${key}`]: value };
    if (value === data2[key]) return { ...acc, [`  ${key}`]: value };
    return { ...acc, [`+ ${key}`]: value, [`- ${key}`]: data2[key] };
  }, {});
  const added = Object.entries(data2)
    .filter(([key]) => !has(data1, key))
    .reduce((acc, [key, value]) => ({ ...acc, [`+ ${key}`]: value }), {});
  const result = { ...changed, ...added };
  return JSON.stringify(result, null, ' ').split('').filter((char) => char !== '"').join('');
};

export default (filepath1, filepath2) => {
  const parsedData1 = getParsedData(filepath1);
  const parsedData2 = getParsedData(filepath2);
  return compare(parsedData1, parsedData2);
};
