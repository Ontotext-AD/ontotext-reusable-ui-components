import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {SearchFieldComponent} from './components/search-field/search-field.component';
import {SearchColumnSelectorComponent} from './components/search-column-selector/search-column-selector.component';
import {SearchDatepickerFacetComponent} from './components/search-datepicker-facet/search-datepicker-facet.component';
import {SearchCheckboxFacetComponent} from './components/search-checkbox-facet/search-checkbox-facet.component';
import {SearchRangeFacetComponent} from './components/search-facet-range/search-range-facet.component';
import {SearchToggleFacetComponent} from './components/search-toggle-facet/search-toggle-facet.component';

const routes: Routes = [
  {path: 'search-results', component: SearchResultsComponent},
  {path: 'search-field', component: SearchFieldComponent},
  {path: 'search-column-select', component: SearchColumnSelectorComponent},
  {path: 'search-checkbox-facet', component: SearchCheckboxFacetComponent},
  {path: 'search-date-range-facet', component: SearchDatepickerFacetComponent},
  {path: 'search-toggle-facet', component: SearchToggleFacetComponent},
  {path: 'search-range-facet', component: SearchRangeFacetComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
