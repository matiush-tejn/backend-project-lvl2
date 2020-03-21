import { readFileSync } from 'fs';
import gendiff from '../src';

const getPath = (filename) => (`__fixtures__/${filename}`);
const flatDiff = readFileSync(getPath('flat/diff'), 'utf-8');

test.each([
  ['flat/before.json', 'flat/after.json'],
  ['flat/before.yml', 'flat/after.yml'],
  ['flat/before.ini', 'flat/after.ini'],
])('gendiff(%s, %s)', (first, second) => {
  expect(gendiff(getPath(first), getPath(second))).toBe(flatDiff);
});
