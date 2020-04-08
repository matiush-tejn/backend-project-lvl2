import { readFileSync } from 'fs';
import { extname } from 'path';
import parse from './parsers';
import buildAst from './buildAst';
import formats from './formatters';

const getParsedData = (filepath) => {
  const data = readFileSync(filepath, 'utf-8');
  const ext = extname(filepath).slice(1);
  return parse(data, ext);
};

export default (filepath1, filepath2, formatName) => {
  const oldData = getParsedData(filepath1);
  const newData = getParsedData(filepath2);
  const astTree = buildAst(oldData, newData);
  const format = formats[formatName];
  return format(astTree);
};
