import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaCatalogueComponent } from './criteria-catalogue.component';

describe('CriteriaCatalogueComponent', () => {
  let component: CriteriaCatalogueComponent;
  let fixture: ComponentFixture<CriteriaCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaCatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
