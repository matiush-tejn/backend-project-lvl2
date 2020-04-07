import { readFileSync } from 'fs';
import gendiff from '../src';

const getPath = (filename) => (`__fixtures__/${filename}`);

test.each([['treelike'], ['plain'], ['json']])('%s output', (format) => {
  const diff = readFileSync(getPath(`diffs/${format}`), 'utf-8');
  expect(gendiff(getPath('before.json'), getPath('after.json'), format)).toBe(diff);
  expect(gendiff(getPath('before.yml'), getPath('after.yml'), format)).toBe(diff);
  expect(gendiff(getPath('before.ini'), getPath('after.ini'), format)).toBe(diff);
});
