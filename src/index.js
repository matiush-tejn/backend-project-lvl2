import getParsedData from './parse';
import buildAst from './buildAst';
import renderer from './renderer';

export default (filepath1, filepath2) => {
  const parsedData1 = getParsedData(filepath1);
  const parsedData2 = getParsedData(filepath2);
  const astTree = buildAst(parsedData1, parsedData2);
  return renderer(astTree);
};
