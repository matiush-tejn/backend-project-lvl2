#!/usr/bin/env node
import program from 'commander';
import gendiff from '..';
import { version, description } from '../../package.json';
import { formatsNames } from '../formatters';

program
  .version(version)
  .description(description)
  .option('-f, --format [type]', `output formats: ${formatsNames.join(', ')}`, 'treelike')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    if (formatsNames.includes(program.format)) {
      console.log(gendiff(firstConfig, secondConfig, program.format));
    } else {
      console.log('Unknown format :(');
    }
  })
  .parse(process.argv);
