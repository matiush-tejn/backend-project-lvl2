import { readFileSync } from 'fs';
import gendiff from '../src';

const getPath = (filename) => (`__fixtures__/${filename}`);
const diff = readFileSync(getPath('diff'), 'utf-8');

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('gendiff(%s, %s)', (first, second) => {
  expect(gendiff(getPath(first), getPath(second))).toBe(diff);
});
