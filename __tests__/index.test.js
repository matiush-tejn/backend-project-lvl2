import { readFileSync } from 'fs';
import gendiff from '../src';

test('difference of json-files', () => {
  const filepath1 = '__fixtures__/before.json';
  const filepath2 = '__fixtures__/after.json';
  const diff = readFileSync('__fixtures__/diff', 'utf-8');
  expect(gendiff(filepath1, filepath2)).toBe(diff);
});

test('difference of yaml-files', () => {
  const filepath1 = '__fixtures__/before.yml';
  const filepath2 = '__fixtures__/after.yml';
  const diff = readFileSync('__fixtures__/diff', 'utf-8');
  expect(gendiff(filepath1, filepath2)).toBe(diff);
});
