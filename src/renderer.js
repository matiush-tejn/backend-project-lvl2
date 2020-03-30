import { mapKeys } from 'lodash';

const align = (content) => (
  content instanceof Object ? mapKeys(content, (value, key) => `  ${key}`) : content);

const normalization = (astTree) => astTree.reduce((acc, { type, key, data }) => {
  if (type === 'deleted') return { ...acc, [`- ${key}`]: align(data) };
  if (type === 'added') return { ...acc, [`+ ${key}`]: align(data) };
  if (type === 'nested') return { ...acc, [`  ${key}`]: normalization(data) };
  if (type === 'equal') return { ...acc, [`  ${key}`]: data };
  return { ...acc, [`- ${key}`]: align(data[0]), [`+ ${key}`]: align(data[1]) };
}, {});

const spacesCount = 4;
export default (astTree) => JSON.stringify(normalization(astTree), null, spacesCount)
  .split('').filter((char) => char !== '"' && char !== ',').join('');
