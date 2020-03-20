import { readFileSync } from 'fs';
import { extname } from 'path';
import { has } from 'lodash';
import parser from './parse';

const compare = (data1, data2) => {
  const changed = Object.entries(data1).reduce((acc, [key, value]) => {
    if (!has(data2, key)) return { ...acc, [`- ${key}`]: value };
    if (value === data2[key]) return { ...acc, [`  ${key}`]: value };
    return { ...acc, [`+ ${key}`]: value, [`- ${key}`]: data2[key] };
  }, {});
  const added = Object.entries(data2).reduce((acc, [key, value]) => (
    has(data1, key) ? acc : { ...acc, [`+ ${key}`]: value }), {});
  const result = { ...changed, ...added };
  return JSON.stringify(result, null, ' ').split('').filter((char) => char !== '"').join('');
};

const getParsedData = (filepath) => {
  const inputData = readFileSync(filepath, 'utf-8');
  const ext = extname(filepath);
  return parser(ext, inputData);
};

export default (filepath1, filepath2) => {
  const parsedData1 = getParsedData(filepath1);
  const parsedData2 = getParsedData(filepath2);
  return compare(parsedData1, parsedData2);
};
