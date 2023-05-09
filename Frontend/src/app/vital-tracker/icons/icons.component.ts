import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LiveService } from 'src/app/services/live.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css'],
})
export class IconsComponent implements OnInit{
  
  @Input() curIcon: number;
  title = "Press"
  subscription: Subscription;
  curTitle = "Brain wave sensor";
  pathToImage = "../../../../assets/images/icon1.jpg";
  allImages = ["../../../../assets/images/icon1.jpg", "../../../../assets/images/icon2.jpg",
              "../../../../assets/images/icon3.jpg", "../../../../assets/images/skin_sensor.jpg"];

  constructor(private liveService:LiveService,
            private router: Router) {
    this.curIcon = liveService.getCurrentDisplayGraph();
    this.curTitle = liveService.getCurrentTitle();
    this.subscription = this.liveService
        .onGraphChange()
        .subscribe((value) => this.curIcon = value);
  }
  ngOnInit(): void {
  }

  toggleAddTask(i : number) {
    this.curIcon = i;
  }


  changeDisplayGraph(i: number) {
    this.curTitle = this.liveService.changeDisplayGraph(i);
  }

}
