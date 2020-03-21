import { readFileSync } from 'fs';
import { extname } from 'path';
import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.ini': parse,
};

export default (filepath) => {
  const ext = extname(filepath);
  const parser = parsers[ext];
  const inputData = readFileSync(filepath, 'utf-8');
  return parser(inputData);
};
