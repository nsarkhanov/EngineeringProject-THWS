import { Component, Inject, OnInit } from '@angular/core';
import { MarketPrice } from 'src/app/market-price';
import { LiveService } from 'src/app/services/live.service';
import { MarketStatusService } from 'src/app/services/market-status.service';

@Component({
  selector: 'app-vital-tracker',
  templateUrl: './vital-tracker.component.html',
  styleUrls: ['./vital-tracker.component.css']
})
export class VitalTrackerComponent implements OnInit{

  title = 'app';
  marketStatus: MarketPrice[];
  marketStatusToPlot: MarketPrice[];
  curGraph: number;
  currentPage: string;


  set MarketStatus(status: MarketPrice[]) {
    this.marketStatus = status;
    this.marketStatusToPlot = this.marketStatus.slice(0, 20);
  }

   constructor(){//@Inject(LiveService) private liveService: LiveService, private marketStatusSvc: MarketStatusService) {
  //   this.curGraph = 1;
  //   this.marketStatusSvc.getInitialMarketStatus()
  //     .subscribe(prices => {
  //       this.MarketStatus = prices;
  
  //       let marketUpdateObservable =  this.marketStatusSvc.getUpdates();  // 1
  //       marketUpdateObservable.subscribe((latestStatus: MarketPrice) => {  // 2
  //         this.MarketStatus = [latestStatus].concat(this.marketStatus);  // 3
  //       });  // 4
  //     });
  }
  ngOnInit(): void {   
  }

  // hasRoute(route: string) {
  //     return this.router.url == route;
  //   }

}
