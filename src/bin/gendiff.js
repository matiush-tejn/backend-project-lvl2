#!/usr/bin/env node
import program from 'commander';
import { version, description } from '../../package.json';
import gendiff from '..';

program
  .version(version)
  .description(description)
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(gendiff(firstConfig, secondConfig)))
  .parse(process.argv);
