import treelike from './treelike';
import plain from './plain';
import json from './json';

const formats = { treelike, plain, json };

export const formatsNames = Object.keys(formats);

export default (astTree, formatName) => formats[formatName](astTree);
