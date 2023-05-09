import { Component, Inject, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { LiveService } from 'src/app/services/live.service';

@Component({
  selector: 'app-imu-dropdown',
  templateUrl: './imu-dropdown.component.html',
  styleUrls: ['./imu-dropdown.component.css']
})
export class ImuDropdownComponent {

  @Input() elements: string[];
  @Input() displayText: string;
  // 0 for data (['Acceleration', 'Orientation','Magnetic','Gyro','Linear','Gravity']) 
  // 1 for axis (['X-Axis', 'Y-Axis', 'Z-Axis'])
  // 2 for sensor id (['Left hand', 'Right hand', 'Left foot', 'Right foot']) 
  @Input() function: number;


  selectedElem: string[];
  selectedSensorID: string;

  constructor(@Inject(LiveService) private liveService:LiveService) {
  }

  ngOnInit() {
    switch (this.function) {
      case 0:
        this.selectedElem = ['Acceleration'];
        break;
      case 1:
        this.selectedElem = ['X-Axis'];
        break;
      case 2:
        this.selectedSensorID = 'Left hand';
    }
  }

  onSelectionChange(event: MatSelectChange) {
    console.log('Selected values:', event.value);
    this.liveService.changeIMUSelected(event.value, this.function);
  }
  
}
