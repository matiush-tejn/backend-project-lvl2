import { flattenDeep } from 'lodash';

const stringify = (value) => {
  if (value instanceof Object) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value;
};

const getKeysLine = (keys) => `Property '${keys.join('.')}' was`;
const handlers = {
  deleted: (keys) => `${getKeysLine(keys)} deleted`,
  added: (keys, value) => `${getKeysLine(keys)} added with value: ${stringify(value)}`,
  nested: (keys, value, formatter) => formatter(value, keys),
  changed: (keys, [oldValue, newValue]) => (
    `${getKeysLine(keys)} changed from ${stringify(oldValue)} to ${stringify(newValue)}`),
};

const formatter = (astTree, prevKeys = []) => astTree
  .filter(({ type }) => type !== 'equal')
  .map(({ type, key, value }) => handlers[type]([...prevKeys, key], value, formatter));

export default (astTree) => flattenDeep(formatter(astTree)).join('\n');
