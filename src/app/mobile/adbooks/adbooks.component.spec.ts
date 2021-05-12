import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdbooksComponent } from './adbooks.component';

describe('AdbooksComponent', () => {
  let component: AdbooksComponent;
  let fixture: ComponentFixture<AdbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
