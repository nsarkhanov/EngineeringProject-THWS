import { Component, Inject } from '@angular/core';
import { LiveService } from 'src/app/services/live.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  title: string = 'Vital Tracker'
  showAddTask: boolean;
  subscription: Subscription;

  constructor(@Inject(LiveService) private uiService:LiveService,
            private router: Router) {
    this.subscription = this.uiService
        .onToggle()
        .subscribe((value) => this.showAddTask = value);
  }

  ngOnInit(): void {}


  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string) {
    return this.router.url == route;
  }
}
