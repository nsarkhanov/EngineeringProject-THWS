import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityMatrixComponent } from './priority-matrix.component';

describe('PriorityMatrixComponent', () => {
  let component: PriorityMatrixComponent;
  let fixture: ComponentFixture<PriorityMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorityMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorityMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
