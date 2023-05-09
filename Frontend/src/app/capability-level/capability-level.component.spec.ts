import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabiltiyLevelComponent } from './capability-level.component';

describe('CapabiltiyLevelComponent', () => {
  let component: CapabiltiyLevelComponent;
  let fixture: ComponentFixture<CapabiltiyLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapabiltiyLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabiltiyLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
