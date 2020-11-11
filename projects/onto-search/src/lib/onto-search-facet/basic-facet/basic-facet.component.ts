import {Component, Input, TemplateRef} from '@angular/core';
import {OntoSearchFacetComponent} from '../onto-search-facet.component';

@Component({
  selector: 'onto-basic-facet',
  templateUrl: './basic-facet.component.html',
  styleUrls: ['./basic-facet.component.scss']
})
export class BasicFacetComponent extends OntoSearchFacetComponent {
  @Input()
  public basicFacetTemplate: TemplateRef<any>;
  public currentFacetTemplate: TemplateRef<any>;

  @Input()
  public facetTitleTemplate?: TemplateRef<any>;
  public currentFacetTitleTemplate: any;

  constructor() {
    super();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.currentFacetTemplate = this.basicFacetTemplate;
    this.currentFacetTitleTemplate = this.facetTitleTemplate;
  }

  public updateAllSelected(selected: string): void {
    const index = this.selected.indexOf(selected);
    if (index > -1) {
      this.selected.splice(index, 1);
    } else {
      this.selected.push(selected);
    }

    this.onSelectionChange.emit();
  }
}

