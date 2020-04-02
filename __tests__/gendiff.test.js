import { readFileSync } from 'fs';
import gendiff from '../src';

const getPath = (filename) => (`__fixtures__/${filename}`);
const treelikeDiff = readFileSync(getPath('treelike-diff'), 'utf-8');
const plainDiff = readFileSync(getPath('plain-diff'), 'utf-8');
const jsonDiff = readFileSync(getPath('json-diff'), 'utf-8');

test.each([
  ['treelike', treelikeDiff],
  ['plain', plainDiff],
  ['json', jsonDiff],
])('%s output', (format, expected) => {
  expect(gendiff(getPath('before.json'), getPath('after.json'), format)).toBe(expected);
  expect(gendiff(getPath('before.yml'), getPath('after.yml'), format)).toBe(expected);
  expect(gendiff(getPath('before.ini'), getPath('after.ini'), format)).toBe(expected);
});
