import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {SearchFieldComponent} from 'src/app/components/search-field/search-field.component';

const routes: Routes = [
  {path: 'search-results', component: SearchResultsComponent},
  {path: 'search-field', component: SearchFieldComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
