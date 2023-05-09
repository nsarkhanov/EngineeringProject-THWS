import { Component } from '@angular/core';
import { LiveService } from 'src/app/services/live.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor (private uiService:LiveService) {}

  changeDisplayGraph(i: number) {
    this.uiService.changeDisplayGraph(i);
  }
}
