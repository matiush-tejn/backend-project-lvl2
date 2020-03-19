import { readFileSync } from 'fs';
import gendiff from '../src';

test('calculating the difference', () => {
  const filepath1 = '__fixtures__/before.json';
  const filepath2 = '__fixtures__/after.json';
  const diff = readFileSync('__fixtures__/diff', 'utf-8');
  expect(gendiff(filepath1, filepath2)).toBe(diff);
});
