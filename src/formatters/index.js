import treelike from './treelike';
import plain from './plain';
import json from './json';

const formats = { treelike, plain, json };

export const formatsTypes = Object.keys(formats);

export default (astTree, formatType) => formats[formatType](astTree);
