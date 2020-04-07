import { safeLoad as yamlParse } from 'js-yaml';
import { decode as iniParse } from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yamlParse,
  ini: iniParse,
};

export default (data, ext) => parsers[ext](data);
