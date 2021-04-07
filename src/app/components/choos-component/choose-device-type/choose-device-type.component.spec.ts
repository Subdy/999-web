import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDeviceTypeComponent } from './choose-device-type.component';

describe('ChooseDeviceTypeComponent', () => {
  let component: ChooseDeviceTypeComponent;
  let fixture: ComponentFixture<ChooseDeviceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseDeviceTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDeviceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
