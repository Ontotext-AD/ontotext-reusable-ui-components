import {Component, SimpleChanges} from '@angular/core';
import {OntoSearchFacetComponent} from '../onto-search-facet.component';
import {FormControl} from '@angular/forms';
import {ReplaySubject} from 'rxjs';
import {SearchFacetModel} from '../models/search-facet-model';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {MatSelectChange} from '@angular/material/select';
import {SearchFacetSelection} from '../models/search-facet-selection';

@Component({
  selector: 'onto-dropdown-multi-select-facet',
  templateUrl: './dropdown-multi-select-facet.component.html',
  styleUrls: ['./dropdown-multi-select-facet.component.scss']
})
export class DropdownMultiSelectFacetComponent extends OntoSearchFacetComponent {
  /** control for the selected from multi-selection */
  public selectedFormControl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public filteredFormControl: FormControl = new FormControl();

  /** list of filtered by search keyword for multi-selection */
  public filtered: ReplaySubject<SearchFacetModel[]> = new ReplaySubject<SearchFacetModel[]>(1);

  private selectedFacets: SearchFacetSelection[];

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.data && changes.data.currentValue) {
      this.selectedFormControl.setValue(this.selected);
      this.init();
    }
  }

  private init(): void {
    this.filtered.next(this.facetGroup.slice());
    this.selectedFormControl.setValue(this.selected);

    this.filteredFormControl.valueChanges
        .pipe(untilComponentDestroyed(this))
        .subscribe(() => {
          this.filter();
        });
  }

  private filter(): void {
    if (!Array.isArray(this.facetGroup)) {
      return;
    }

    let search = this.filteredFormControl.value;
    if (!search) {
      this.filtered.next(this.facetGroup.slice());
      return;
    }

    search = search.toLowerCase();

    this.filtered.next(
        this.facetGroup.filter((item) => item.label.toLowerCase().indexOf(search) > -1));
  }

  public onSelection($event: MatSelectChange): void {
    const selection = $event.value;
    selection.forEach((item) => item.selected = true);
    this.facetGroup.filter((item) => selection.indexOf(item) === - 1).map((item) => item.selected = false);
    this.selectedFacets = $event.value;
  }

  public onOpenedChange(isOpen: boolean): void {
    if (!isOpen ) {
      const selection = {
        name: this.facetGroupName,
        selected: this.selectedFacets,
        count: this.countFacetResults()
      };
      this.onSelectionChange.emit(selection);
    }
  }

  private countFacetResults(): number {
    let sum = 0;
    this.selectedFormControl.value.forEach((facet) => sum += facet.count);
    return sum;
  }
}
