import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {SearchFieldComponent} from './components/search-field/search-field.component';
import {SearchColumnSelectorComponent} from './search-column-selector/search-column-selector.component';
import {SearchFacetComponent} from './components/search-facet/search-facet.component';

const routes: Routes = [
  {path: 'search-results', component: SearchResultsComponent},
  {path: 'search-field', component: SearchFieldComponent},
  {path: 'search-column-select', component: SearchColumnSelectorComponent},
  {path: 'search-facet', component: SearchFacetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
