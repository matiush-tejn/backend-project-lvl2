import { flattenDeep } from 'lodash';

const stringify = (value) => {
  if (value instanceof Object) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value;
};

const handlers = {
  deleted: (path) => `Property '${path}' was deleted`,
  added: (path, value) => `Property '${path}' was added with value: ${stringify(value)}`,
  changed: (path, [value1, value2]) => (
    `Property '${path}' was changed from ${stringify(value1)} to ${stringify(value2)}`),
};

const renderer = (astTree, prevKeys = []) => astTree
  .filter(({ type }) => type !== 'equal')
  .map(({ type, key, value }) => {
    const keys = [...prevKeys, key];
    return type === 'nested' ? renderer(value, keys) : handlers[type](keys.join('.'), value);
  });

export default (astTree) => flattenDeep(renderer(astTree)).join('\n');
