import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveChartComponent } from './live-chart.component';

describe('MarketChartComponent', () => {
  let component: LiveChartComponent;
  let fixture: ComponentFixture<LiveChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
