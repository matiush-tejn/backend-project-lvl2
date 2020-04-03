import { readFileSync } from 'fs';
import { extname } from 'path';
import parse from './parsers';
import buildAst from './buildAst';
import formatters from './formatters';

const getParsedData = (filepath) => {
  const data = readFileSync(filepath, 'utf-8');
  const ext = extname(filepath);
  return parse(data, ext);
};

export default (filepath1, filepath2, format) => {
  const oldData = getParsedData(filepath1);
  const newData = getParsedData(filepath2);
  const astTree = buildAst(oldData, newData);
  const formatter = formatters[format];
  return formatter(astTree);
};
