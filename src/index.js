import { readFileSync } from 'fs';
import { has } from 'lodash';

const compare = (json1, json2) => {
  const changed = Object.entries(json1).reduce((acc, [key, value]) => {
    if (!has(json2, key)) return { ...acc, [`- ${key}`]: value };
    if (value === json2[key]) return { ...acc, [`  ${key}`]: value };
    return { ...acc, [`+ ${key}`]: value, [`- ${key}`]: json2[key] };
  }, {});
  const added = Object.entries(json2).reduce((acc, [key, value]) => (
    has(json1, key) ? acc : { ...acc, [`+ ${key}`]: value }), {});
  const result = { ...changed, ...added };
  return JSON.stringify(result, null, ' ').split('').filter((char) => char !== '"').join('');
};

export default (filepath1, filepath2) => {
  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');
  const json1 = JSON.parse(data1);
  const json2 = JSON.parse(data2);
  const diff = compare(json1, json2);
  return diff;
};
