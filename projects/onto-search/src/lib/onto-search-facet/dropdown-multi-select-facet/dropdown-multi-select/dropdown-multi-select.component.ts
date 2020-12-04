import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'onto-dropdown-multi-select',
  templateUrl: './dropdown-multi-select.component.html',
  styleUrls: ['./dropdown-multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownMultiSelectComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class DropdownMultiSelectComponent extends OnDestroyMixin implements OnInit, ControlValueAccessor {
  @ViewChild('searchSelectInput', {static: false, read: ElementRef})
  searchSelectInput: ElementRef;

  public options: QueryList<MatOption>;

  /** Current search value */
  get searchValue(): string {
    return this.value;
  }

  private value: string;

  private onChange: Function = (): any => {};
  private onTouched: Function = (): any => {};

  private previousSelected: any[];
  private change = new EventEmitter<string>();
  private ENTER: string = 'Enter';
  private previousSelectedValues: any;

  constructor(@Inject(MatSelect) public matSelect: MatSelect) {
    super();
  }

  ngOnInit(): void {
    this.matSelect.panelClass = 'mat-select-search-panel';

    this.matSelect.openedChange
        .pipe(untilComponentDestroyed(this))
        .subscribe((opened) => {
          this.options = this.matSelect.options;
          opened ? this.focus() : this.reset();
        });

    // Hack to prevent auto focus and Space or Enter interaction with mat options.
    this.matSelect.typeaheadDebounceInterval = 31536000;

    this.init();
  }

  initMultiSelectedValues(): void {
    if (this.matSelect.multiple) {
      this.previousSelectedValues = this.matSelect.options
          .filter((option) => option.selected)
          .map((option) => option.value);
    }
  }

  /**
   * Handles the key down event with MatSelect.
   * Do not handles ENTER key press
   * @param {KeyboardEvent} event
   */
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === this.ENTER) {
      event.stopPropagation();
    }
  }

  writeValue(value: string): void {
    const valueChanged = value !== this.value;
    if (valueChanged) {
      this.value = value;
      this.change.emit(value);
    }
  }

  onInputChange(value): void {
    const valueChanged = value !== this.value;
    if (valueChanged) {
      this.initMultiSelectedValues();
      this.value = value;
      this.onChange(value);
      this.change.emit(value);
    }
  }

  onBlur(value: string): void {
    this.writeValue(value);
    this.onTouched();
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  /**
   * Focuses the search input field
   */
  public focus(): void {
    if (!this.searchSelectInput) {
      return;
    }

    // Needed to trigger focus after angular digest. Otherwise focus may be lost
    setTimeout(() => {
      this.searchSelectInput.nativeElement.focus();
    }, 0);
  }

  /**
   * Resets the current search value
   * @param {boolean} focus whether to focus after resetting
   */
  public reset(focus?: boolean): void {
    if (!this.searchSelectInput) {
      return;
    }
    this.searchSelectInput.nativeElement.value = '';
    this.onInputChange('');
    if (focus) {
      this.focus();
    }
  }

  /**
   * Initializes handling <mat-select [multiple]="true">
   * Note: to improve this code, mat-select should be extended to allow disabling resetting the selection while filtering.
   */
  private init(): void {
    // if <mat-select [multiple]="true">
    // store previously selected values and restore them when they are deselected
    // because the option is not available while we are currently filtering
    this.matSelect.valueChange
        .pipe(untilComponentDestroyed(this))
        .subscribe((values) => {
          if (this.matSelect.multiple) {
            let restoreSelectedValues = false;
            if (this.value && this.value.length && Array.isArray(this.previousSelected)) {
              if (!Array.isArray(values)) {
                values = [];
              }

              const optionValues = this.matSelect.options.map((option) => option.value);
              this.previousSelected.forEach((previousValue) => {
                if (values.indexOf(previousValue) === -1 && optionValues.indexOf(previousValue) === -1) {
                // if a value that was selected before is deselected and not found in the options, it was deselected
                // due to the filtering, so we restore it.
                  values.push(previousValue);
                  restoreSelectedValues = true;
                }
              });
            }

            if (restoreSelectedValues) {
              this.matSelect._onChange(values);
            }

            this.previousSelected = values;
          }
        });
  }
}
