const indentStep = 4;
const getIndent = (count) => ' '.repeat(count * indentStep);
const addBrackets = (content, indentCount) => `{\n${content}\n${getIndent(indentCount)}  }`;

const stringify = (value, indentCount) => {
  if (!(value instanceof Object)) return value.toString();
  const content = Object.keys(value)
    .map((key) => (
      `${getIndent(indentCount + 1)}  ${key}: ${stringify(value[key], indentCount + 1)}`))
    .join('\n');
  return addBrackets(content, indentCount);
};

const renderer = (astTree, indentCount) => {
  const buildString = (prefix, key, value) => {
    const indent = getIndent(indentCount);
    return `${indent}${prefix} ${key}: ${stringify(value, indentCount)}`;
  };

  const handlers = {
    deleted: (key, value) => buildString('-', key, value),
    added: (key, value) => buildString('+', key, value),
    nested: (key, value) => {
      const content = renderer(value, indentCount + 1);
      const contentInBrackets = addBrackets(content, indentCount);
      return buildString(' ', key, contentInBrackets);
    },
    equal: (key, value) => buildString(' ', key, value),
    changed: (key, [value1, value2]) => {
      const textRepresent1 = buildString('-', key, value1);
      const textRepresent2 = buildString('+', key, value2);
      return `${textRepresent1}\n${textRepresent2}`;
    },
  };

  return astTree
    .map(({ type, key, value }) => handlers[type](key, value))
    .join('\n');
};

export default (astTree) => `{\n${renderer(astTree, 1)}\n}`;