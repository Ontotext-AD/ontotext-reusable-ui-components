import {COMMA, ENTER} from '@angular/cdk/keycodes';

export class SearchConfiguration {
  static visible: boolean = true;
  static selectable: boolean = true;
  static removable: boolean = true;
  static separatorKeysCodes: number[] = [ENTER, COMMA];
}
