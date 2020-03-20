import { readFileSync } from 'fs';
import { extname } from 'path';
import { safeLoad } from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
};

export default (filepath) => {
  const ext = extname(filepath);
  const parser = parsers[ext];
  const inputData = readFileSync(filepath, 'utf-8');
  return parser(inputData);
};
