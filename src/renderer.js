import { mapKeys } from 'lodash';

const align = (content) => (
  content instanceof Object ? mapKeys(content, (value, key) => `  ${key}`) : content);

const normalization = (astTree) => astTree
  .reduce((acc, [type, key, firstValue, secondValue, children]) => {
    if (type === 'deleted') return { ...acc, [`- ${key}`]: align(firstValue) };
    if (type === 'added') return { ...acc, [`+ ${key}`]: align(secondValue) };
    if (type === 'nested') return { ...acc, [`  ${key}`]: normalization(children) };
    if (type === 'equal') return { ...acc, [`  ${key}`]: firstValue };
    return { ...acc, [`- ${key}`]: align(firstValue), [`+ ${key}`]: align(secondValue) };
  }, {});

export default (astTree) => JSON.stringify(normalization(astTree), null, 4)
  .split('').filter((char) => char !== '"' && char !== ',').join('');
