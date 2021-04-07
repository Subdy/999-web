import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortClassificationComponent } from './port-classification.component';

describe('PortClassificationComponent', () => {
  let component: PortClassificationComponent;
  let fixture: ComponentFixture<PortClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortClassificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
