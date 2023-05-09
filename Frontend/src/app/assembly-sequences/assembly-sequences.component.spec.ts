import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblySequencesComponent } from './assembly-sequences.component';

describe('AssemblySequencesComponent', () => {
  let component: AssemblySequencesComponent;
  let fixture: ComponentFixture<AssemblySequencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssemblySequencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssemblySequencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
