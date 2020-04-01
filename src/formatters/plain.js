import { flattenDeep, isEmpty } from 'lodash';

const stringify = (value) => {
  if (value instanceof Object) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value;
};

const handlers = {
  deleted: (key) => `Property '${key}' was deleted`,
  added: (key, value) => `Property '${key}' was added with value: ${stringify(value)}`,
  changed: (key, [value1, value2]) => (
    `Property '${key}' was changed from ${stringify(value1)} to ${stringify(value2)}`),
};

const getFullKey = (prevKeys, key) => (isEmpty(prevKeys) ? key : `${prevKeys.join('.')}.${key}`);
const renderer = (astTree, prevKeys = []) => astTree
  .filter(({ type }) => type !== 'equal')
  .map(({ type, key, value }) => (type === 'nested'
    ? renderer(value, [...prevKeys, key])
    : handlers[type](getFullKey(prevKeys, key), value)));

export default (astTree) => flattenDeep(renderer(astTree)).join('\n');
