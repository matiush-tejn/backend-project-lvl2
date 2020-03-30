import { mapKeys } from 'lodash';

const align = (content) => (
  content instanceof Object ? mapKeys(content, (value, key) => `  ${key}`) : content);

const handlers = {
  deleted: (key, data) => ({ [`- ${key}`]: align(data) }),
  added: (key, data) => ({ [`+ ${key}`]: align(data) }),
  nested: (key, data, convert) => ({ [`  ${key}`]: convert(data) }),
  equal: (key, data) => ({ [`  ${key}`]: data }),
  changed: (key, data) => ({ [`- ${key}`]: align(data[0]), [`+ ${key}`]: align(data[1]) }),
};

const convert = (astTree) => astTree.reduce((acc, { type, key, data }) => {
  const handler = handlers[type];
  return { ...acc, ...handler(key, data, convert) };
}, {});

const spacesCount = 4;
export default (astTree) => JSON.stringify(convert(astTree), null, spacesCount)
  .split('').filter((char) => char !== '"' && char !== ',').join('');
