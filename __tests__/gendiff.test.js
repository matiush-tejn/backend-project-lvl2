import { readFileSync } from 'fs';
import gendiff from '../src';

const getPath = (filename) => (`__fixtures__/${filename}`);
const treelikeDiff = readFileSync(getPath('treelike-diff'), 'utf-8');
const plainDiff = readFileSync(getPath('plain-diff'), 'utf-8');

test.each([
  ['before.json', 'after.json', 'treelike', treelikeDiff],
  ['before.yml', 'after.yml', 'treelike', treelikeDiff],
  ['before.ini', 'after.ini', 'treelike', treelikeDiff],
  ['before.json', 'after.json', 'plain', plainDiff],
  ['before.yml', 'after.yml', 'plain', plainDiff],
  ['before.ini', 'after.ini', 'plain', plainDiff],
])('gendiff(%s, %s, %s)', (first, second, format, expected) => {
  expect(gendiff(getPath(first), getPath(second), format)).toBe(expected);
});
