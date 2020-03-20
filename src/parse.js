import { safeLoad } from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
};

export default (ext, data) => {
  const parser = parsers[ext];
  return parser(data);
};
