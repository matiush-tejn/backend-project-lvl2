export default (diffNodes) => {
  const result = diffNodes.reduce((acc, [type, key, firstValue, secondValue]) => {
    if (type === 'deleted') return { ...acc, [`- ${key}`]: firstValue };
    if (type === 'added') return { ...acc, [`+ ${key}`]: secondValue };
    if (type === 'equal') return { ...acc, [`  ${key}`]: firstValue };
    return { ...acc, [`- ${key}`]: firstValue, [`+ ${key}`]: secondValue };
  }, {});
  return JSON.stringify(result, null, ' ').split('').filter((char) => char !== '"').join('');
};
