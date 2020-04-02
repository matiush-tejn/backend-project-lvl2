const indentStep = 4;
const getIndent = (count) => ' '.repeat(count * indentStep);
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
  deleted: (key, value, depth) => buildString('-', key, value, depth),
  added: (key, value, depth) => buildString('+', key, value, depth),
  nested: (key, value, depth, formatter) => {
    const content = formatter(value, depth + 1);
    const contentInBrackets = addBrackets(content, depth);
    return buildString(' ', key, contentInBrackets, depth);
  },
  equal: (key, value, depth) => buildString(' ', key, value, depth),
  changed: (key, [value1, value2], depth) => {
    const textRepresent1 = buildString('-', key, value1, depth);
    const textRepresent2 = buildString('+', key, value2, depth);
    return `${textRepresent1}\n${textRepresent2}`;
  },
};

const formatter = (astTree, depth) => astTree
  .map(({ type, key, value }) => handlers[type](key, value, depth, formatter))
  .join('\n');

export default (astTree) => `{\n${formatter(astTree, 1)}\n}`;
