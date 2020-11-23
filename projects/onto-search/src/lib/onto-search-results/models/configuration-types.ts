import {TemplateRef} from '@angular/core';

/**
 * Table configuration
 *
 * @param {ColumnConfig[]} columnConfigurations - an array containing configuration for each column
 * @param {boolean} showFooter - will show footer row if true
 * @param {boolean} enableSort - enables sorting of columns
 */
export type TableConfig = {
  columnConfigurations: ColumnConfig[];
  showFooter: boolean;
  enableSort: boolean;
};

/**
 * @callback DataFunction
 * @param {*} args - data object
 * @return {string}
 */

/**
 * @callback FooterFunction
 * @param {*[]} dataSource - the datasource of the table
 * @param {ColumnConfig} columnConfig - the configuration of the column
 */

/**
 * Column configuration
 *
 * @param {string} name - name of the column, must not use space
 * @param {string} label - label for the column, which is displayed in the UI
 * @param {DataFunction} [dataFunction] - function for displaying value in data cell of column
 * @param {TemplateRef<*>} [dataTemplate] - template for displaying value in data cell of column
 * @param {FooterFunction} [footerFunction] - function for displaying value in footer cell of column
 * @param {boolean} [enableSort] - sorting by this column is enabled if true
 * @param {boolean} [hidden] - denotes if the column should be hidden
 * @param {boolean} [permanent] - denotes if the column should displayed always despite hidden value
 * @param {number} [order] - sets order for columns to be displayed initially
 */
export type ColumnConfig = {
  name: string;
  label: string;
  dataFunction?: (args) => string;
  dataTemplate?: TemplateRef<any>;
  footerFunction?: (dataSource: any[], columnConfig: ColumnConfig) => string;
  enableSort?: boolean;
  hidden?: boolean;
  permanent?: boolean
  order?: number;
};
