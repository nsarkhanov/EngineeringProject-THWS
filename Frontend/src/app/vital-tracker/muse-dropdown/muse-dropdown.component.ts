import { Component, Inject, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { LiveService } from 'src/app/services/live.service';

@Component({
  selector: 'app-muse-dropdown',
  templateUrl: './muse-dropdown.component.html',
  styleUrls: ['./muse-dropdown.component.css']
})
export class MuseDropdownComponent {
  @Input() elements: string[];
  @Input() displayText: string;

  selectedElem: string[] = ['TP9', 'AF7','AF8','TP10','RightAUX'];

  constructor(@Inject(LiveService) private liveService:LiveService) {}


  onSelectionChange(event: MatSelectChange) {
    console.log('Selected values:', event.value);
    this.liveService.changeMuseSelected(event.value);
    // Do something with the selected values
  }
  
}
