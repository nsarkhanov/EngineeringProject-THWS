import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimePickerButtonComponent } from './date-time-picker-button.component';

describe('DateTimePickerButtonComponent', () => {
  let component: DateTimePickerButtonComponent;
  let fixture: ComponentFixture<DateTimePickerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateTimePickerButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateTimePickerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
