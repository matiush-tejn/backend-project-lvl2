import getParsedData from './parse';
import buildAst from './buildAst';
import formatters from './formatters';

export default (filepath1, filepath2, format) => {
  const parsedData1 = getParsedData(filepath1);
  const parsedData2 = getParsedData(filepath2);
  const astTree = buildAst(parsedData1, parsedData2);
  const formatter = formatters[format];
  return formatter(astTree);
};
