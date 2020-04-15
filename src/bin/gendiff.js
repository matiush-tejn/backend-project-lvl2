#!/usr/bin/env node
import program from 'commander';
import gendiff from '..';
import { version, description } from '../../package.json';
import { formatsTypes } from '../formatters';

program
  .version(version)
  .description(description)
  .option('-f, --format [type]', `output formats: ${formatsTypes.join(', ')}`, 'treelike')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    if (formatsTypes.includes(program.format)) {
      console.log(gendiff(firstConfig, secondConfig, program.format));
    } else {
      console.log('Unknown format :(');
    }
  })
  .parse(process.argv);
