import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseDropdownComponent } from './muse-dropdown.component';

describe('MuseDropdownComponent', () => {
  let component: MuseDropdownComponent;
  let fixture: ComponentFixture<MuseDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuseDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuseDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
