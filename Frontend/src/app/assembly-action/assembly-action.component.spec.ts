import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyActionComponent } from './assembly-action.component';

describe('AssemblyActionComponent', () => {
  let component: AssemblyActionComponent;
  let fixture: ComponentFixture<AssemblyActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssemblyActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblyActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
