import {TemplateRef} from '@angular/core';

export type TableConfig = {
  columnConfigurations: ColumnConfig[];
  showFooter: boolean;
};

export type ColumnConfig = {
  name: string;
  label: string;
  dataFunction?: (args) => string;
  dataTemplate?: TemplateRef<any>;
  footerFunction?: () => string;
};
