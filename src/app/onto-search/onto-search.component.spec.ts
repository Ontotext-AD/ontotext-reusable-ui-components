import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OntoSearchComponent } from './onto-search.component';

describe('OntoSearchComponent', () => {
  let component: OntoSearchComponent;
  let fixture: ComponentFixture<OntoSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OntoSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OntoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
