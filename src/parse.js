import { readFileSync } from 'fs';
import { extname } from 'path';
import { safeLoad as yamlParse } from 'js-yaml';
import { decode as iniParse } from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': yamlParse,
  '.ini': iniParse,
};

export default (filepath) => {
  const inputData = readFileSync(filepath, 'utf-8');
  const ext = extname(filepath);
  const parser = parsers[ext];
  return parser(inputData);
};
