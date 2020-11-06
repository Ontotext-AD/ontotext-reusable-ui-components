import {COMMA, ENTER} from '@angular/cdk/keycodes';

/**
 * Configuration of the search input and mat-chip integration.
 */
export class SearchFieldConfiguration {
  /**
   * Determines whether a selected phrase can be selected
   */
  static selectable: boolean = true;

  /**
   * Determines whether a selected phrase can be deleted from list
   */
  static removable: boolean = true;

  /**
   * A list of characters that can be used as a phrase separator
   */
  static separatorKeysCodes: number[] = [ENTER, COMMA];
}
