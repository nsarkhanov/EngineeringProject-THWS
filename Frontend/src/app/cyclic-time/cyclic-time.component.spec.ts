import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyclicTimeComponent } from './cyclic-time.component';

describe('CyclicTimeComponent', () => {
  let component: CyclicTimeComponent;
  let fixture: ComponentFixture<CyclicTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyclicTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CyclicTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
