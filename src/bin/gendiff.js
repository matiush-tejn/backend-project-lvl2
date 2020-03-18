#!/usr/bin/env node
import program from 'commander';
import { version, description } from '../../package.json';

program
  .version(version)
  .description(description)
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(firstConfig, secondConfig));

program.parse(process.argv);
