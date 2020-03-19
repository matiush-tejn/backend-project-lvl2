import { readFileSync } from 'fs';
import gendiff from '../src';

test('calculating the difference', () => {
  const filepath1 = 'fixtures/before.json';
  const filepath2 = 'fixtures/after.json';
  const diff = readFileSync('fixtures/diff', 'utf-8');
  expect(gendiff(filepath1, filepath2)).toBe(diff);
});
