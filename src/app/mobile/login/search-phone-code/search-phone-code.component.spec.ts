import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPhoneCodeComponent } from './search-phone-code.component';

describe('SearchPhoneCodeComponent', () => {
  let component: SearchPhoneCodeComponent;
  let fixture: ComponentFixture<SearchPhoneCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPhoneCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPhoneCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
