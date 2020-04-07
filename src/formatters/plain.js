import { flattenDeep } from 'lodash';

const stringify = (value) => {
  if (value instanceof Object) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value;
};

const getKeysLine = (keys) => `Property '${keys.join('.')}' was`;
const handlers = {
  deleted: (keys) => `${getKeysLine(keys)} deleted`,
  added: (keys, { newValue }) => `${getKeysLine(keys)} added with value: ${stringify(newValue)}`,
  nested: (keys, { children }, iter) => iter(children, keys),
  changed: (keys, { oldValue, newValue }) => (
    `${getKeysLine(keys)} changed from ${stringify(oldValue)} to ${stringify(newValue)}`),
};

const iter = (astTree, prevKeys = []) => astTree
  .filter(({ type }) => type !== 'equal')
  .map((node) => handlers[node.type]([...prevKeys, node.key], node, iter));

export default (astTree) => flattenDeep(iter(astTree)).join('\n');
