import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumiComponent } from './humi.component';

describe('HumiComponent', () => {
  let component: HumiComponent;
  let fixture: ComponentFixture<HumiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HumiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
