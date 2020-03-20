import { readFileSync } from 'fs';
import { extname } from 'path';
import { has } from 'lodash';
import { safeLoad } from 'js-yaml';

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
  const ext1 = extname(filepath1);
  const ext2 = extname(filepath2);
  const obj1 = ext1 === '.json' ? JSON.parse(data1) : safeLoad(data1);
  const obj2 = ext2 === '.json' ? JSON.parse(data2) : safeLoad(data2);
  const diff = compare(obj1, obj2);
  return diff;
};
