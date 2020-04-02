#!/usr/bin/env node
import program from 'commander';
import gendiff from '..';
import { version, description } from '../../package.json';
import { formats } from '../formatters';

program
  .version(version)
  .description(description)
  .option('-f, --format [type]', `output formats: ${formats.join(', ')}`, 'treelike')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const output = formats.includes(program.format)
      ? gendiff(firstConfig, secondConfig, program.format)
      : 'Unknown format :(';
    console.log(output);
  })
  .parse(process.argv);
