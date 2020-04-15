import { flattenDeep } from 'lodash';

const stringify = (value) => {
  if (value instanceof Object) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value.toString();
};

const handlers = {
  deleted: (keys) => `Property '${keys.join('.')}' was deleted`,
  added: (keys, { newValue }) => (
    `Property '${keys.join('.')}' was added with value: ${stringify(newValue)}`),
  nested: (keys, { children }, iter) => iter(children, keys),
  changed: (keys, { oldValue, newValue }) => (
    `Property '${keys.join('.')}' was changed from ${stringify(oldValue)} to ${stringify(newValue)}`),
};

const iter = (astTree, prevKeys = []) => astTree
  .filter(({ type }) => type !== 'equal')
  .map((node) => handlers[node.type]([...prevKeys, node.key], node, iter));

export default (astTree) => flattenDeep(iter(astTree)).join('\n');
