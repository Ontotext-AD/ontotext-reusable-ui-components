import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AppComponent} from "src/app/app.component";
import {OntoSearchFieldModule} from "../../projects/onto-search/src/lib/onto-search-field/onto-search-field.module";
import { OntoSearchResultsModule } from '../../projects/onto-search/src/lib/onto-search-results/onto-search-results.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        OntoSearchFieldModule,
        OntoSearchResultsModule
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ontotext-reusable-ui-components'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ontotext-reusable-ui-components');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('ontotext-reusable-ui-components app is running!');
  });
});
