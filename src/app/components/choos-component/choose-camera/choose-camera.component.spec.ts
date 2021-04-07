import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCameraComponent } from './choose-camera.component';

describe('ChooseCameraComponent', () => {
  let component: ChooseCameraComponent;
  let fixture: ComponentFixture<ChooseCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseCameraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
