import { readFileSync } from 'fs';
import gendiff from '../src';

const getPath = (filename) => (`__fixtures__/${filename}`);
const flatDiff = readFileSync(getPath('flat/diff'), 'utf-8');
const nestedDiff = readFileSync(getPath('nested/diff'), 'utf-8');

test.each([
  ['flat/before.json', 'flat/after.json'],
  ['flat/before.yml', 'flat/after.yml'],
  ['flat/before.ini', 'flat/after.ini'],
])('gendiff(%s, %s)', (first, second) => {
  expect(gendiff(getPath(first), getPath(second))).toBe(flatDiff);
});

test.each([
  ['nested/before.json', 'nested/after.json'],
  ['nested/before.yml', 'nested/after.yml'],
  ['nested/before.ini', 'nested/after.ini'],
])('gendiff(%s, %s)', (first, second) => {
  expect(gendiff(getPath(first), getPath(second))).toBe(nestedDiff);
});
