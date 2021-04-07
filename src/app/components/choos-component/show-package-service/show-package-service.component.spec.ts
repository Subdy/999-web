import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPackageServiceComponent } from './show-package-service.component';

describe('ShowPackageServiceComponent', () => {
  let component: ShowPackageServiceComponent;
  let fixture: ComponentFixture<ShowPackageServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPackageServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPackageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
