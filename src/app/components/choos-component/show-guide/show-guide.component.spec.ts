import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGuideComponent } from './show-guide.component';

describe('ShowGuideComponent', () => {
  let component: ShowGuideComponent;
  let fixture: ComponentFixture<ShowGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
