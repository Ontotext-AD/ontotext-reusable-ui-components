import {COMMA, ENTER} from '@angular/cdk/keycodes';

/**
 * Configuration of the search input and mat-chip integration.
 */
export class SearchConfiguration {
  static visible: boolean = true;
  static selectable: boolean = true;
  static removable: boolean = true;
  static separatorKeysCodes: number[] = [ENTER, COMMA];
}
