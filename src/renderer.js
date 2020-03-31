const indentStep = 4;
const getIndent = (count) => ' '.repeat(count * indentStep);

const renderer = (astTree, indentCount) => {
  const indent = getIndent(indentCount);
  const addBrackets = (content) => `{\n${content}\n${indent}  }`;

  const stringify = (value) => {
    if (!(value instanceof Object)) return value.toString();
    const content = Object.keys(value)
      .map((key) => `${getIndent(indentCount + 1)}  ${key}: ${value[key]}`)
      .join('\n');
    return addBrackets(content);
  };

  const buildString = (prefix, key, value) => `${indent}${prefix} ${key}: ${stringify(value)}`;
  const handlers = {
    deleted: (key, value) => buildString('-', key, value),
    added: (key, value) => buildString('+', key, value),
    nested: (key, value) => buildString(' ', key, addBrackets(renderer(value, indentCount + 1))),
    equal: (key, value) => buildString(' ', key, value),
    changed: (key, [value1, value2]) => `${buildString('-', key, value1)}\n${buildString('+', key, value2)}`,
  };

  return astTree
    .map(({ type, key, value }) => handlers[type](key, value))
    .join('\n');
};

export default (astTree) => `{\n${renderer(astTree, 1)}\n}`;
