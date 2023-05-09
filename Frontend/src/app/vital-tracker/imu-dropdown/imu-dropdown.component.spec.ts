import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImuDropdownComponent } from './imu-dropdown.component';

describe('ImuDropdownComponent', () => {
  let component: ImuDropdownComponent;
  let fixture: ComponentFixture<ImuDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImuDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImuDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
