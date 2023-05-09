import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalTrackerComponent } from './vital-tracker.component';

describe('VitalTrackerComponent', () => {
  let component: VitalTrackerComponent;
  let fixture: ComponentFixture<VitalTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitalTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
