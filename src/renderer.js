import { mapKeys } from 'lodash';

const align = (content) => (
  content instanceof Object ? mapKeys(content, (value, key) => `  ${key}`) : content);

const convert = (astTree) => astTree.reduce((acc, { type, key, data }) => {
  if (type === 'deleted') return { ...acc, [`- ${key}`]: align(data) };
  if (type === 'added') return { ...acc, [`+ ${key}`]: align(data) };
  if (type === 'nested') return { ...acc, [`  ${key}`]: convert(data) };
  if (type === 'equal') return { ...acc, [`  ${key}`]: data };
  return { ...acc, [`- ${key}`]: align(data[0]), [`+ ${key}`]: align(data[1]) };
}, {});

const spacesCount = 4;
export default (astTree) => JSON.stringify(convert(astTree), null, spacesCount)
  .split('').filter((char) => char !== '"' && char !== ',').join('');
