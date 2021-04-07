import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLangComponent } from './search-lang.component';

describe('SearchLangComponent', () => {
  let component: SearchLangComponent;
  let fixture: ComponentFixture<SearchLangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchLangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
