const indentStep = 4;
const prefixBlockLength = 2;
const getIndent = (depth) => ' '.repeat((depth * indentStep) - prefixBlockLength);
const addBrackets = (content, depth) => `{\n${content}\n${getIndent(depth)}  }`;

const stringify = (value, depth) => {
  if (!(value instanceof Object)) return value.toString();
  const content = Object.keys(value)
    .map((key) => (
      `${getIndent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`))
    .join('\n');
  return addBrackets(content, depth);
};

const buildString = (prefix, key, value, depth) => {
  const indent = getIndent(depth);
  return `${indent}${prefix} ${key}: ${stringify(value, depth)}`;
};

const handlers = {
  deleted: ({ key, oldValue }, depth) => buildString('-', key, oldValue, depth),
  added: ({ key, newValue }, depth) => buildString('+', key, newValue, depth),
  nested: ({ key, children }, depth, iter) => {
    const content = iter(children, depth + 1);
    const contentInBrackets = addBrackets(content, depth);
    return buildString(' ', key, contentInBrackets, depth);
  },
  equal: ({ key, oldValue }, depth) => buildString(' ', key, oldValue, depth),
  changed: ({ key, oldValue, newValue }, depth) => (
    `${buildString('-', key, oldValue, depth)}\n${buildString('+', key, newValue, depth)}`),
};

const iter = (astTree, depth = 1) => astTree
  .map((node) => handlers[node.type](node, depth, iter))
  .join('\n');

export default (astTree) => `{\n${iter(astTree)}\n}`;
