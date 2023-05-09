import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateTimePickerDialogComponent } from '../date-time-picker-dialog/date-time-picker-dialog.component';

@Component({
  selector: 'app-date-time-picker-button',
  templateUrl: './date-time-picker-button.component.html',
  styleUrls: ['./date-time-picker-button.component.css']
})
export class DateTimePickerButtonComponent {

  // we display buttonText[start]
  @Input() start: number;
  @Input() min: Date;
  @Input() max: Date;


  buttonText = ["Select start time", "Select end time"];
  
  constructor(private dialog: MatDialog) {}

  openDateTimePicker(): void {
    const dialogRef = this.dialog.open(DateTimePickerDialogComponent, {
      width: '400px',
      disableClose: true,
      autoFocus: false,
      data: {
        start: this.start,
        min: this.min,
        max: this.max,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // if start = 0, we are on the start button, so we will display buttonText[0], otherwise buttonText[1]
      if (result != undefined && result != "Invalid date")
        this.buttonText = ["Start: " + result, "End: " + result];
      console.log("Result: " + this.buttonText);
      // do something with the selected date and time
    });
  }
}
