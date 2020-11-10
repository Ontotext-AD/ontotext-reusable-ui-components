import {SelectionColumn} from './selection-column';

/**
 * Selection column groups
 *
 * @param {string} label - the label of the group of columns
 * @param {SelectionColumn[]} columns - an array of columns that belong to the group
 */
export type SelectionColumnGroup = {
  label: string;
  columns: SelectionColumn[];
};


