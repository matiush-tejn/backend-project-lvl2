import treelike from './treelike';
import plain from './plain';
import json from './json';

const formatters = { treelike, plain, json };
export const formats = Object.keys(formatters);
export default formatters;
