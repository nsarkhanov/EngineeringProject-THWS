import {ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnChanges, Output, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrainSensorData } from 'BrainSensorData';
import * as d3 from 'd3';
import { DataPoint } from 'DataPoint';
import { Router } from 'express';
import { HeartSkinRateData } from 'HeartSkinRateData';
import { IMUSensorData } from 'IMUSensorData';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { LiveService } from 'src/app/services/live.service';
import { interval, throwError } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators'
import { tap, retryWhen, delayWhen } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { timer, of } from 'rxjs';

@Component({
  selector: 'app-live-chart',
  templateUrl: './live-chart.component.html',
  styleUrls: ['./live-chart.component.css'],
  host: {
    'class': 'graph'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveChartComponent {
  @ViewChild('chart')
  chartElement: ElementRef;


  private svgElement: HTMLElement;
  private minutesToShow = 3;
  private chartProps: any;
  curColor: string;
  @Output() curIcon: number = 1;
  private title: string;
  private allColors = ["violet", "red", "orange", "purple"];
  //earliest date in dataToPlot, ie where the graph should start
  startTime: Date; 
  //latest date in dataToPlot, ie where the graph should end
  endTime: Date;
  // earliest date in data (minimum startDate that can be chosen)
  min: Date; 
  // latest date in data (maximum endDate that can be chosen)
  max: Date; 

  //Muse specific properties
  private chartPropsMuse: any;
  private museSelected: number[] = [1, 2, 3, 4, 5];

  graphSubscription: Subscription;
  startTimeSubscription: Subscription;
  endTimeSubscription: Subscription;
  museSubscription: Subscription;
  dataSubscription: Subscription;
  updates: { dataSubObservable: Observable<HeartSkinRateData | BrainSensorData | IMUSensorData>; disconnectSocket: () => void; };
  dataUpdateSubscription: Subscription;

  imuData: number[] = [1];
  imuAxes: number[] = [1];
  imuSensor: number = 1;


  imuDataSubscription: Subscription;
  imuAxesSubsciption: Subscription;
  imuSensorSubsciption: Subscription;


  data: HeartSkinRateData[] | BrainSensorData[] | IMUSensorData[];
  dataToPlot: HeartSkinRateData[] | BrainSensorData[] | IMUSensorData[];

  ngOnInit(): void { 
    this.curColor = this.allColors[this.liveService.getCurrentDisplayGraph() - 1];
    // we pass true because it is the inital chart build and not update
    this.curIcon = this.liveService.getCurrentDisplayGraph();
    this.getDataAndUpdateChart(true);
  }

  ngOnDestroy() {
    // Call the disconnect function to close the socket connection
    if (this.updates)
      this.updates.disconnectSocket();
  }

  constructor(@Inject(LiveService) private liveService:LiveService,
              @Inject(DataService) private dataService: DataService) {
              //private router: Router, private route: ActivatedRoute) {
    this.graphSubscription = this.liveService
      .onGraphChange()
      .subscribe((value) => { 
        switch(value) {
          case 1:
            this.curColor = 'violet';
            this.title = "Muse";
            this.curIcon = 1;
            break;
          case 2:
            this.curColor = 'red';
            this.title = "Heart rate sensor";
            this.curIcon = 2;
            break;
          case 3:
            this.curColor = 'orange';
            this.title = "IMU sensor";
            this.curIcon = 3;
            break;
          case 4:
            this.curColor = 'purple';
            this.title = "Skin sensor";
            this.curIcon = 4;
            break;
        }
        this.getDataAndUpdateChart(false);
    });

    this.startTimeSubscription = this.liveService
      .onstartTimeChange()
      .subscribe((value) => {
        this.startTime = value;
        this.filter_dataToPlot();
        this.removeAllCharts();
        this.buildChart();
      });

    this.endTimeSubscription = this.liveService
      .onEndTimeChange()
      .subscribe((value) => {
        this.endTime = value;
        this.filter_dataToPlot();
        this.removeAllCharts();
        this.buildChart();
      });

    this.museSubscription = this.liveService
      .onMuseChange()
      .subscribe((value) => {
        this.museSelected = value;
        this.removeAllCharts();
        this.buildChart();
    });

    this.imuDataSubscription = this.liveService
      .onIMUDataChange()
      .subscribe((value) => {
        this.imuData = value;
        this.removeAllCharts();
        this.buildChart();
      });

    this.imuDataSubscription = this.liveService
    .onIMUAxesChange()
    .subscribe((value) => {
      this.imuAxes = value;
      this.removeAllCharts();
      this.buildChart();
    });

    this.imuSensorSubsciption = this.liveService
    .onIMUSensorChange()
    .subscribe((value) => {
      this.imuSensor = value;
      this.removeAllCharts();
      // because seonsorID might have changed changed
      // in methods before, the change of imuData eg will change the way buildChart gets y value from dataToPlot,
      // but the data is the same
      this.filter_dataToPlot();
      this.buildChart();
    });

  }

  /**
   * DataToPlot is data starting from startTime and ending at endTime
   * We filter this.data
   */
  filter_dataToPlot() {
    switch (this.curIcon) {
      case 1:
        this.dataToPlot = (this.data as BrainSensorData[]).filter(data => data.date.getTime() >= this.startTime.getTime() && data.date.getTime() <= this.endTime.getTime());
        break;
      case 2:
        this.dataToPlot = (this.data as HeartSkinRateData[]).filter(data => data.date.getTime() >= this.startTime.getTime() && data.date.getTime() <= this.endTime.getTime());
        break;
      case 3:
        this.dataToPlot = (this.data as IMUSensorData[]).filter(data => data.date.getTime() >= this.startTime.getTime() && data.date.getTime() <= this.endTime.getTime()
                                                                    && data.sensorID == this.imuSensor);        
        break;
      case 4:
        this.dataToPlot = (this.data as HeartSkinRateData[]).filter(data => data.date.getTime() >= this.startTime.getTime() && data.date.getTime() <= this.endTime.getTime());
        break;
      }
  }

  // A custom method to check should retry a request or not
  shouldRetry() {
    console.log("Error ocured");
    this.removeAllCharts();
    return of(null).pipe(delay(1000));  
  }

  getDataAndUpdateChart(isInitial: boolean) {
    // parameters: userID, curIcon/curGraph,
    this.dataSubscription = this.dataService.getInitialData(1, this.curIcon)
      .pipe(
        retryWhen(errors => errors.pipe(
          tap(() => { 
              console.log('Error occurred, waiting 1 second before retrying...');
              this.removeAllCharts();
          }),
          delayWhen(() => timer(1000))
        ))
      )
      .subscribe({
        next: data => {
        // first disconnect socket if still active
        if (this.updates)
          this.updates.disconnectSocket();
        this.updates =  this.dataService.getUpdates(this.curIcon);
        
        data.map(d => d.date = new Date(d.date))
        this.data = data;
        this.dataToPlot = data;
        // this.min = this.findExtremeDate(data, true);
        this.max = this.findExtremeDate(data, false);
        this.endTime = this.max;
        this.startTime = new Date(this.endTime.getTime() - this.minutesToShow * 60000);  
        // will filter dataToPlot according to start and endTime that we just set
        this.filter_dataToPlot();
        if (!isInitial) {
          this.removeAllCharts();
        }
        this.buildChart();

        this.dataUpdateSubscription = this.updates.dataSubObservable
          .subscribe((latestStatus: HeartSkinRateData | BrainSensorData | IMUSensorData) => {  
            // this.data = latestStatus; 
            if (latestStatus) {
              switch(this.curIcon) {
                case 1:
                  this.updateChartMuse(latestStatus);
                  break;
                case 2:
                  this.updateChartHeartSkin(latestStatus);
                  break;
                case 3:
                  this.updateChartIMU(latestStatus);
                  break;
                case 4:
                  this.updateChartHeartSkin(latestStatus);
                  break;
              }
            }
          });  
      }, 
      error: error => {
        console.log("Error occured");











        this.removeAllCharts();    
      }
    });
  }

  findExtremeDate(data: HeartSkinRateData[] | BrainSensorData[] | IMUSensorData[], earliest: boolean): Date {
    if (earliest) {
      switch(this.curIcon) {
        case 1:
          return (data as BrainSensorData[]).reduce((earliest, current) => {
            return (current.date < earliest.date) ? current : earliest;
          }).date;
        case 2:
          return (data as HeartSkinRateData[]).reduce((earliest, current) => {
            return (current.date < earliest.date) ? current : earliest;
          }).date;
        default:
          return (data as BrainSensorData[]).reduce((earliest, current) => {
            return (current.date < earliest.date) ? current : earliest;
          }).date;
      }
    }
    else {
      switch(this.curIcon) {
        case 1:
          return (data as BrainSensorData[]).reduce((latest, current) => {
            return (current.date > latest.date) ? current : latest;
          }).date;
        case 2:
          return (data as HeartSkinRateData[]).reduce((latest, current) => {
            return (current.date > latest.date) ? current : latest;
          }).date;
        default:
          return (data as BrainSensorData[]).reduce((latest, current) => {
            return (current.date > latest.date) ? current : latest;
          }).date;
      }
    }
  }


  buildChart() {
    switch(this.curIcon) {
      case 1: 
        this.buildChartMuse();
        break;
      case 2:
        this.buildChartHeartSkin();
        break;
      case 3:
        this.buildChartIMU();
        break;
      case 4:
        this.buildChartHeartSkin();
        break;
    }
  }

  parseDate = d3.timeParse('%d-%m-%Y');

  formatDate() {
    this.data.forEach(ms => {
      if (typeof ms.date === 'string') {
        ms.date = this.parseDate(ms.date);
      }
    });
  }

  buildChartMuse() {
    let colors = ['blue','green', 'red', 'violet', 'orange'];
    //this array contains the props for each chart, that we need in the update method
    this.chartProps = []
    for (let i = 0; i < this.museSelected.length; ++i) {
      let graphNumber = this.museSelected[i];
      if (i < this.museSelected.length-1)
        this.buildMuseChartComponent(graphNumber, colors[graphNumber-1], false);
      else
        this.buildMuseChartComponent(graphNumber, colors[graphNumber-1], true);
    }
  }

  buildChartIMU() {
    this.chartProps = [];
    for (let i = 0; i < this.imuData.length; ++i) {
      let graphNumber = this.imuData[i];
      this.buildIMUChartComponent(graphNumber);
    }
  }

  buildIMUChartComponent(graphNumber: number) {
    const chartId = `chart-${graphNumber}`;
    const chartContainer = document.createElement('div');
    chartContainer.setAttribute('id', chartId);
    this.chartElement.nativeElement.appendChild(chartContainer);


    var chartProps: any = {};
    this.formatDate();
  
    // Set the dimensions of the canvas / graph
    
    var margin = { top: 10, right: 0, bottom: 60, left: 200 },
    width = 1000 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom;
    
  
    // Set the ranges
    chartProps.x = d3.scaleLinear().range([0, width]);
    chartProps.y = d3.scaleLinear().range([height, 0]);
  
    // Define the axes
    var xAxis = d3.axisBottom(chartProps.x)
    // .tickSizeInner(-height)
    // .tickSizeOuter(0);
    

    var yAxis = d3.axisLeft(chartProps.y)
    .ticks(0.5)
    .tickSizeInner(-width)
    .tickSizeOuter(0);
  
    let _this = this;

    

    var getYValue = (d: IMUSensorData, coordinate: number) => {
      switch(graphNumber) {
        case 1: 
          return chartProps.y(d.acceleration[coordinate-1]);
        case 2: 
          return chartProps.y(d.orientation[coordinate-1]);
        case 3: 
          return chartProps.y(d.gyro[coordinate-1]);
        case 4:
          return chartProps.y(d.magnetic[coordinate-1]);
        case 5:
          return chartProps.y(d.linear[coordinate-1]);
        case 6:
          return chartProps.y(d.gravity[coordinate-1]);
        default:
          throw new Error("Trying to plot imu data but data does not have any brain data (acceleration, orientation,...)");
    }
  };

    let colors = ['blue','green', 'pink'];
    var valueLines: any[] = [];
    for (let i = 0; i < this.imuAxes.length; ++i) {
      var coordinate = this.imuAxes[i];
      var getValueLineForCoordinate = function(coordinate) {
        return d3.line<IMUSensorData>()
          .x(function(d: IMUSensorData) {
            return chartProps.x(d.date.getTime());
          })
          .y(function(d: IMUSensorData) {
            switch (graphNumber) {
              case 1:
                return chartProps.y(d.acceleration[coordinate - 1]);
              case 2:
                return chartProps.y(d.orientation[coordinate - 1]);
              case 3:
                return chartProps.y(d.magnetic[coordinate - 1]);
              case 4:
                return chartProps.y(d.gyro[coordinate - 1]);
              case 5:
                return chartProps.y(d.linear[coordinate - 1]);
              case 6:
                return chartProps.y(d.gravity[coordinate - 1]);
              default:
                throw new Error("Trying to plot imu data but data does not have any brain data (acceleration, orientation,...)");
            }
          });
      };
      
      valueLines.push(getValueLineForCoordinate);
    }
    
    var svg = d3.select(`#${chartId}`)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scale the range of the data
    chartProps.x.domain(
      [Math.min.apply(Math, _this.dataToPlot.map(function(o) { return o.date.getTime(); })), 
        Math.max.apply(Math, this.dataToPlot.map(function(o) { return o.date.getTime(); }))]);  

    chartProps.y.domain(
      [Math.min(0, Math.min.apply(Math, _this.dataToPlot.map(function(o) { 
        switch(graphNumber) {
          case 1: 
            return Math.min(...o.acceleration); 
          case 2: 
            return Math.min(...o.orientation); 
          case 3: 
            return Math.min(...o.magnetic); 
          case 4:
            return Math.min(...o.gyro); 
          case 5:
              return Math.min(...o.linear); 
          case 6:
            return Math.min(...o.gravity); 
          default:
            throw new Error("Trying to plot imu data but data does not have any brain data (acceleration, orientation,...)");
        }
      }))), 
        Math.max.apply(Math, this.dataToPlot.map(function(o) { 
          switch(graphNumber) {
            case 1: 
              return Math.max(...o.acceleration); 
            case 2: 
              return Math.max(...o.orientation); 
            case 3: 
              return Math.max(...o.magnetic); 
            case 4:
              return Math.max(...o.gyro); 
            case 5:
                return Math.max(...o.linear); 
            case 6:
              return Math.max(...o.gravity); 
            default:
              throw new Error("Trying to plot imu data but data does not have any brain data (acceleration, orientation,...)");
          }
         }))]);  

    for (let i = 0; i < valueLines.length; ++i) {
      var coordinate = this.imuAxes[i];
      var valueLine = valueLines[i](coordinate);
      svg.append('path')
          .attr('class', `line line${i+1}`)
          .style('stroke', colors[coordinate-1])
          .style('fill', 'none')
          .attr('d', valueLine(_this.dataToPlot));
    }


    // Define the x axis with a custom tick format function
    var xAxis = d3.axisBottom(chartProps.x)
    .tickFormat(function (d, i) {
      return '';
    });

    var tx = -25;
    var ty = -18;
    var tw = 100;
    var th = 200;

      // Add the X Axis
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("g")
    .append("svg:foreignObject")
    .attr("width", tw)
    .attr("height", 60)
    .attr("x", tx)
    .attr("y", ty)
    .append("xhtml:div")
    .attr("class", "my-x-axis-label")
    .html(function(d, i) {
      var timeDiv = '<span class="tick-time">' + d3.timeFormat('%H:%M:%S')(new Date(d)) + '</span>';

      // Check if the current tick value is the first or last value, or if the date has changed
      if (i === 0 || i === _this.dataToPlot.length - 1 || _this.dataToPlot[i].date.getDate() !== _this.dataToPlot[i - 1].date.getDate()) {
        var dateDiv = '<span class="tick-date">' + d3.timeFormat('%Y-%m-%d')(new Date(d)) + '</span>';
        return '<div class = "tick-value">' + dateDiv + '<br>' + timeDiv + '</div>';
      } else {
        return '<div class = "tick-value">' + '<br>' + timeDiv + '</div>';
      }
    });
    
  
    // Add the Y Axis
    svg.append('g')
    .attr('class', 'grid')
    .call(yAxis);

    //hovering
    var tooltip = d3.select(`#${chartId}`)
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('border', '1px solid black')
    .style('border-radius', '5px');

    let tooltipCircles: any[] = [];
    for (let i = 0; i < valueLines.length; ++i) {
      var tooltipCircle = svg
      .append('circle')
      .attr("class", "tooltip-circle")
      .attr("r", 5)
      .style("fill", "steelblue")
      .style("opacity", 0);
      tooltipCircles.push(tooltipCircle);
    }
      // Select all elements with class "line" and add a mouseover event listener
      d3.select(`#${chartId}`)
      .on('mouseover', function () {
        // Set the opacity of the tooltip to 1 (i.e. make it visible)
        tooltip.style('opacity', 1);
      })
      .on('mousemove', function (event) {
        tooltip.style('opacity', 1);

        // Get the x and y coordinates of the mouse pointer relative to the SVG element
        var mouseX = d3.pointer(event)[0];
        var mouseY = d3.pointer(event)[1];
        var mouseX = d3.pointer(event)[0] ;
        var mouseY = d3.pointer(event)[1];
        var minValuex = Math.min.apply(Math, _this.dataToPlot.map(function(o) { return o.date.getTime(); }));

        // Convert the x and y coordinates of the mouse pointer to their corresponding data values on the chart
        var x0 = chartProps.x.invert(mouseX-198);
        const i = closestIndex(x0, _this.dataToPlot);

        var d: IMUSensorData = _this.dataToPlot[i] as IMUSensorData;

        // Set the content and position of the tooltip based on the closest data point to the x value of the mouse pointer
        switch(graphNumber) {
          case 1: 
            var text = [`<span style="color:${colors[0]};"> X: <span style="color:black;"> ` + d.acceleration[0] + "<br>",
                        `<span style="color:${colors[1]};"> Y: <span style="color:black;"> ` + d.acceleration[0] + "<br>",
                        `<span style="color:${colors[2]};"> Z: <span style="color:black;"> ` + d.acceleration[0] + "<br>"
                       ]

            tooltip.html(_this.imuAxes.reduce((result, coordinate) => result + text[coordinate-1], '')+ "Time: " + d3.timeFormat('%H:%M:%S')(d.date))
            .style('left', (event.pageX-275) + 'px')
            .style('top', (event.pageY -135) + 'px');
            tooltip.style('opacity', 1);  
            for (let i = 0; i < tooltipCircles.length; ++i) {
              var coordinate = _this.imuAxes[i];
              var tooltipCircle = tooltipCircles[i];
              tooltipCircle
              .attr("cx", chartProps.x(d.date.getTime()))
              .attr("cy", chartProps.y(d.acceleration[coordinate-1]))
              .style("opacity", 1);
            }

            // tooltipCircle2
            // .attr("cx", chartProps.x(d.date.getTime()))
            // .attr("cy", chartProps.y(d.acceleration[coordinate2-1]))
            // .style("opacity", 1);
            break;
          case 2: 
            var text = [`<span style="color:${colors[0]};"> X: <span style="color:black;"> ` + d.orientation[0] + "<br>",
                        `<span style="color:${colors[1]};"> Y: <span style="color:black;"> ` + d.orientation[0] + "<br>",
                        `<span style="color:${colors[2]};"> Z: <span style="color:black;"> ` + d.orientation[0] + "<br>"
                       ]
            tooltip.html(_this.imuAxes.reduce((result, coordinate) => result + text[coordinate-1], '')+ "Time: " + d3.timeFormat('%H:%M:%S')(d.date))
            .style('left', (event.pageX-275) + 'px')
            .style('top', (event.pageY -135) + 'px');
            tooltip.style('opacity', 1);  
            for (let i = 0; i < tooltipCircles.length; ++i) {
              var coordinate = _this.imuAxes[i];
              var tooltipCircle = tooltipCircles[i];
              tooltipCircle
              .attr("cx", chartProps.x(d.date.getTime()))
              .attr("cy", chartProps.y(d.orientation[coordinate-1]))
              .style("opacity", 1);
            }
            break;
          case 3: 
            var text = [`<span style="color:${colors[0]};"> X: <span style="color:black;"> ` + d.magnetic[0] + "<br>",
                        `<span style="color:${colors[1]};"> Y: <span style="color:black;"> ` + d.magnetic[0] + "<br>",
                        `<span style="color:${colors[2]};"> Z: <span style="color:black;"> ` + d.magnetic[0] + "<br>"
                      ]
            tooltip.html(_this.imuAxes.reduce((result, coordinate) => result + text[coordinate-1], '')+ "Time: " + d3.timeFormat('%H:%M:%S')(d.date))
            .style('left', (event.pageX-275) + 'px')
            .style('top', (event.pageY -135) + 'px');
            tooltip.style('opacity', 1);  
            for (let i = 0; i < tooltipCircles.length; ++i) {
              var coordinate = _this.imuAxes[i];
              var tooltipCircle = tooltipCircles[i];
              tooltipCircle
              .attr("cx", chartProps.x(d.date.getTime()))
              .attr("cy", chartProps.y(d.magnetic[coordinate-1]))
              .style("opacity", 1);
            }
            break;
          case 4:
            var text = [`<span style="color:${colors[0]};"> X: <span style="color:black;"> ` + d.gyro[0] + "<br>",
                        `<span style="color:${colors[1]};"> Y: <span style="color:black;"> ` + d.gyro[0] + "<br>",
                        `<span style="color:${colors[2]};"> Z: <span style="color:black;"> ` + d.gyro[0] + "<br>"
                       ]
            tooltip.html(_this.imuAxes.reduce((result, coordinate) => result + text[coordinate-1], '')+ "Time: " + d3.timeFormat('%H:%M:%S')(d.date))
            .style('left', (event.pageX-275) + 'px')
            .style('top', (event.pageY -135) + 'px');
            tooltip.style('opacity', 1);  
            for (let i = 0; i < tooltipCircles.length; ++i) {
              var coordinate = _this.imuAxes[i];
              var tooltipCircle = tooltipCircles[i];
              tooltipCircle
              .attr("cx", chartProps.x(d.date.getTime()))
              .attr("cy", chartProps.y(d.gyro[coordinate-1]))
              .style("opacity", 1);
            }
            break;
          case 5:
            var text = [`<span style="color:${colors[0]};"> X: <span style="color:black;"> ` + d.linear[0] + "<br>",
                        `<span style="color:${colors[1]};"> Y: <span style="color:black;"> ` + d.linear[0] + "<br>",
                        `<span style="color:${colors[2]};"> Z: <span style="color:black;"> ` + d.linear[0] + "<br>"
                       ]
            tooltip.html(_this.imuAxes.reduce((result, coordinate) => result + text[coordinate-1], '')+ "Time: " + d3.timeFormat('%H:%M:%S')(d.date))
            .style('left', (event.pageX-275) + 'px')
            .style('top', (event.pageY -135) + 'px');
            tooltip.style('opacity', 1);  
            for (let i = 0; i < tooltipCircles.length; ++i) {
              var coordinate = _this.imuAxes[i];
              var tooltipCircle = tooltipCircles[i];
              tooltipCircle
              .attr("cx", chartProps.x(d.date.getTime()))
              .attr("cy", chartProps.y(d.linear[coordinate-1]))
              .style("opacity", 1);
            }
            break;
          case 6:
            var text = [`<span style="color:${colors[0]};"> X: <span style="color:black;"> ` + d.gravity[0] + "<br>",
                        `<span style="color:${colors[1]};"> Y: <span style="color:black;"> ` + d.gravity[0] + "<br>",
                        `<span style="color:${colors[2]};"> Z: <span style="color:black;"> ` + d.gravity[0] + "<br>"
                       ]
            tooltip.html(_this.imuAxes.reduce((result, coordinate) => result + text[coordinate-1], '')+ "Time: " + d3.timeFormat('%H:%M:%S')(d.date))
            .style('left', (event.pageX-275) + 'px')
            .style('top', (event.pageY -135) + 'px');
            tooltip.style('opacity', 1);  
            for (let i = 0; i < tooltipCircles.length; ++i) {
              var coordinate = _this.imuAxes[i];
              var tooltipCircle = tooltipCircles[i];
              tooltipCircle
              .attr("cx", chartProps.x(d.date.getTime()))
              .attr("cy", chartProps.y(d.gravity[coordinate-1]))
              .style("opacity", 1);
            }
            break;
          default:
            throw new Error("Trying to add tooltip dsiplaying imu data but data does not have any imz data (acceleration, orientation,...)");
        }
        
        
      })
      .on('mouseout', function () {
        // Set the opacity of the tooltip back to 0 (i.e. hide it)
        tooltip.style('opacity', 0);
      })

      const titleGroup = svg.append('g')
        .attr('transform', `translate(-60,${margin.top+40})`);

      const titles = ['Acceleration', 'Orientation', 'Magnetic', 'Gyro', 'Linear', 'Gravity'];
      var size = '21px';
      if (graphNumber == 1)
        size = '18px';
      titleGroup.append('text')
        .text(titles[graphNumber-1])
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'hanging')
        .attr('font-size', size);   

  
    // Setting the required objects in chartProps so they could be used to update the chart
    chartProps.svg = svg;
    chartProps.valueLines = valueLines;
    chartProps.margin = margin;
    chartProps.xAxis = xAxis;
    chartProps.yAxis = yAxis;

    this.chartProps.push(chartProps);
  }

  buildMuseChartComponent(graphNumber: number, color: string, isLast: boolean) {
    const chartId = `chart-${graphNumber}`;
    const chartContainer = document.createElement('div');
    chartContainer.setAttribute('id', chartId);
    this.chartElement.nativeElement.appendChild(chartContainer);

    var chartProps: any = {};
    this.formatDate();
  
    // Set the dimensions of the canvas / graph
    if (!isLast) {
    var margin = { top: 10, right: 0, bottom: 40, left: 200 },
      width = 1000 - margin.left - margin.right,
      height = 110 - margin.top - margin.bottom;
    }
    else {
      var margin = { top: 10, right: 0, bottom: 60, left: 200 },
      width = 1000 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;
    }
  
    // Set the ranges
    chartProps.x = d3.scaleLinear().range([0, width]);
    chartProps.y = d3.scaleLinear().range([height, 0]);
  
    // Define the axes
    if (isLast) {
      var xAxis = d3.axisBottom(chartProps.x)
      // .tickSizeInner(-height)
      // .tickSizeOuter(0);
    }

    var yAxis = d3.axisLeft(chartProps.y)
    .ticks(0.5)
    .tickSizeInner(-width)
    .tickSizeOuter(0);
  
    let _this = this;
  
    // Define the line
    var valueline = d3.line<BrainSensorData>()
      .x(function (d: BrainSensorData) {
          return chartProps.x(d.date.getTime());
      })
      .y(function (d: BrainSensorData) { 
        switch(graphNumber) {
          case 1: 
            return chartProps.y(d.TP9);
          case 2: 
            return chartProps.y(d.AF7);
          case 3: 
            return chartProps.y(d.AF8);
          case 4:
            return chartProps.y(d.TP10);
          case 5:
            return chartProps.y(d.RightAUX);
          default:
            throw new Error("Trying to plot muse/brain data but data does not have any brain data (TP9, AF7,...)");
        }
      });

    var svg = d3.select(`#${chartId}`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

  
    // Scale the range of the data
    chartProps.x.domain(
      [Math.min.apply(Math, _this.dataToPlot.map(function(o) { return o.date.getTime(); })), 
        Math.max.apply(Math, this.dataToPlot.map(function(o) { return o.date.getTime(); }))]);  

    chartProps.y.domain(
      [Math.min(0, Math.min.apply(Math, _this.dataToPlot.map(function(o) { 
        switch(graphNumber) {
          case 1: 
            return o.TP9; 
          case 2: 
            return o.AF7; 
          case 3: 
            return o.AF8; 
          case 4:
            return o.TP10;
          case 5:
            return o.RightAUX;
          default:
            throw new Error("Trying to plot muse/brain data but data does not have any brain data (TP9, AF7,...)");
        }
      }))), 
        Math.max.apply(Math, this.dataToPlot.map(function(o) { 
          switch(graphNumber) {
            case 1: 
              return o.TP9; 
            case 2: 
              return o.AF7; 
            case 3: 
              return o.AF8; 
            case 4:
              return o.TP10;
            case 5:
              return o.RightAUX;
            default:
              throw new Error("Trying to plot muse/brain data but data does not have any brain data (TP9, AF7,...)");
          }
         }))]);  
  
    // Add the valueline path.
    svg.append('path')
      .attr('class', 'line line1')
      .style('stroke', color)
      .style('fill', 'none')
      .attr('d', valueline(_this.dataToPlot));
  
  
    // Define the x axis with a custom tick format function
    if (isLast) {
        var xAxis = d3.axisBottom(chartProps.x)
        .tickFormat(function (d, i) {
          return '';
        });

        var tx = -25;
        var ty = -18;
        var tw = 100;
        var th = 200;

        // Add the X Axis
      svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("g")
      .append("svg:foreignObject")
      .attr("width", tw)
      .attr("height", 60)
      .attr("x", tx)
      .attr("y", ty)
      .append("xhtml:div")
      .attr("class", "my-x-axis-label")
      .html(function(d, i) {
        var timeDiv = '<span class="tick-time">' + d3.timeFormat('%H:%M:%S')(new Date(d)) + '</span>';

        // Check if the current tick value is the first or last value, or if the date has changed
        if (i === 0 || i === _this.dataToPlot.length - 1 || _this.dataToPlot[i].date.getDate() !== _this.dataToPlot[i - 1].date.getDate()) {
          var dateDiv = '<span class="tick-date">' + d3.timeFormat('%Y-%m-%d')(new Date(d)) + '</span>';
          return '<div class = "tick-value">' + dateDiv + '<br>' + timeDiv + '</div>';
        } else {
          return '<div class = "tick-value">' + '<br>' + timeDiv + '</div>';
        }
      });
    }

  
    // Add the Y Axis
    svg.append('g')
    .attr('class', 'grid')
    .call(yAxis);

    //hovering
    var tooltip = d3.select(`#${chartId}`)
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('border', '1px solid black')
    .style('border-radius', '5px');

    var tooltipCircle = svg
    .append('circle')
    .attr("class", "tooltip-circle")
    .attr("r", 5)
    .style("fill", "steelblue")
    .style("opacity", 0);

      // Select all elements with class "line" and add a mouseover event listener
      d3.select(`#${chartId}`)
      .on('mouseover', function () {
        // Set the opacity of the tooltip to 1 (i.e. make it visible)
        tooltip.style('opacity', 1);
      })
      .on('mousemove', function (event) {
        tooltip.style('opacity', 1);

        // Get the x and y coordinates of the mouse pointer relative to the SVG element
        var mouseX = d3.pointer(event)[0];
        var mouseY = d3.pointer(event)[1];
        var mouseX = d3.pointer(event)[0] ;
        var mouseY = d3.pointer(event)[1];
        var minValuex = Math.min.apply(Math, _this.dataToPlot.map(function(o) { return o.date.getTime(); }));

        // Convert the x and y coordinates of the mouse pointer to their corresponding data values on the chart
        var x0 = chartProps.x.invert(mouseX-198);
        const i = closestIndex(x0, _this.dataToPlot);

        var d: BrainSensorData = _this.dataToPlot[i] as BrainSensorData;

        // Set the content and position of the tooltip based on the closest data point to the x value of the mouse pointer
        switch(graphNumber) {
          case 1: 
            tooltip.html('Value: ' + d.TP9 + "<br>" + "Time: " + d3.timeFormat('%H:%M:%S')(d.date))
            .style('left', (event.pageX-275) + 'px')
            .style('top', (event.pageY -135) + 'px');
            tooltip.style('opacity', 1);  

            tooltipCircle
            .attr("cx", chartProps.x(d.date.getTime()))
            .attr("cy", chartProps.y(d.TP9))
            .style("opacity", 1);
            break;
          case 2: 
            tooltip.html('Value: ' + d.AF7 + "<br>" + "Time: " + d3.timeFormat('%H:%M:%S')(d.date))
            .style('left', (event.pageX-275) + 'px')
            .style('top', (event.pageY -135) + 'px');
            tooltipCircle
            .attr("cx", chartProps.x(d.date.getTime()))
            .attr("cy", chartProps.y(d.AF7))
            .style("opacity", 1);
            break;
          case 3: 
            tooltip.html('Value: ' + d.AF8 + "<br>" + "Time: " + d3.timeFormat('%H:%M:%S')(d.date))
            .style('left', (event.pageX-275) + 'px')
            .style('top', (event.pageY -135) + 'px');
            tooltipCircle
            .attr("cx", chartProps.x(d.date.getTime()))
            .attr("cy", chartProps.y(d.AF8))
            .style("opacity", 1);
            break;
          case 4:
            tooltip.html('Value: ' + d.TP10 + "<br>" + "Time: " + d3.timeFormat('%H:%M:%S')(d.date))
            .style('left', (event.pageX-275) + 'px')
            .style('top', (event.pageY -135) + 'px');
            tooltipCircle
            .attr("cx", chartProps.x(d.date.getTime()))
            .attr("cy", chartProps.y(d.TP10))
            .style("opacity", 1);
            break;
          case 5:
            tooltip.html('Value: ' + d.RightAUX + "<br>" + "Time: " + d3.timeFormat('%H:%M:%S')(d.date))
            .style('left', (event.pageX-275) + 'px')
            .style('top', (event.pageY -135) + 'px');
            tooltipCircle
            .attr("cx", chartProps.x(d.date.getTime()))
            .attr("cy", chartProps.y(d.RightAUX))
            .style("opacity", 1);
            break;
          default:
            throw new Error("Trying to add tooltip dsiplaying muse/brain data but data does not have any brain data (TP9, AF7,...)");
        }
        
      })
      .on('mouseout', function () {
        // Set the opacity of the tooltip back to 0 (i.e. hide it)
        tooltip.style('opacity', 0);
      })

      const titleGroup = svg.append('g')
        .attr('transform', `translate(-60,${margin.top+25})`);

      const titles = ['TP9', 'AF7', 'AF8', 'TP10', 'RightAUX'];
      titleGroup.append('text')
        .text(titles[graphNumber-1])
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'hanging')
        .attr('font-size', '24px')
        .attr('fill', color);      

      chartProps.svg = svg;
      chartProps.valueline = valueline;
      chartProps.margin = margin;
      if (xAxis)
        chartProps.xAxis = xAxis;
      chartProps.yAxis = yAxis;

      this.chartProps.push(chartProps);
  }


  buildChartHeartSkin() {
    const chartId = `chart-${0}`;
    const chartContainer = document.createElement('div');
    chartContainer.setAttribute('id', chartId);
    this.chartElement.nativeElement.appendChild(chartContainer);


    this.chartProps = {};
    this.formatDate();
  
    // Set the dimensions of the canvas / graph
    var margin = { top: 50, right: 0, bottom: 30, left: 200 },
      width = 1000 - margin.left - margin.right,
      height = 470 - margin.top - margin.bottom;
  
    // Set the ranges
    this.chartProps.x = d3.scaleLinear().range([0, width]);
    this.chartProps.y = d3.scaleLinear().range([height, 0]);
  
    // Define the axes
    // var xAxis = d3.axisBottom(this.chartProps.x)
    //   // .tickSizeInner(-height)
    //   // .tickSizeOuter(0);
    var yAxis = d3.axisLeft(this.chartProps.y)
    .ticks(5)
    .tickSizeInner(-width)
    .tickSizeOuter(0);
  


    let _this = this;
  
    // Define the line
    var valueline = d3.line<HeartSkinRateData>()
      .x(function (d: HeartSkinRateData) {
          return _this.chartProps.x(d.date.getTime());
      })
      .y(function (d: HeartSkinRateData) { 
        return _this.chartProps.y(d.rate); 
      });
  
    var svg = d3.select(`#${chartId}`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    // Scale the range of the data
    this.chartProps.x.domain(
      [Math.min.apply(Math, _this.dataToPlot.map(function(o) { return o.date.getTime(); })), 
        Math.max.apply(Math, this.dataToPlot.map(function(o) { return o.date.getTime(); }))]);  

    this.chartProps.y.domain(
      [Math.min(0, Math.min.apply(Math, _this.dataToPlot.map(function(o) { return o.rate; }))), 
        Math.max.apply(Math, this.dataToPlot.map(function(o) { return o.rate; }))]);  
  
    // Add the valueline path.
    svg.append('path')
      .attr('class', 'line line1')
      .style('stroke', this.curColor)
      .style('fill', 'none')
      .attr('d', valueline(_this.dataToPlot));
  
  
    // Define the x axis with a custom tick format function
    var xAxis = d3.axisBottom(this.chartProps.x)
    .tickFormat(function (d, i) {
      return '';
    });

    var tx = -25;
    var ty = -18;
    var tw = 100;
    var th = 200;

    // Add the X Axis
  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis.ticks(5))
  // selects all of the individual tick-and-label groups that were created by the "xAxis" function above
  .selectAll("g")
  // to each tick-and-label group we append an html which is a 'foreign object'
  .append("svg:foreignObject")
  .attr("width", tw)
  .attr("height", 60)
  .attr("x", tx)
  .attr("y", ty)
  .append("xhtml:div")
  .attr("class", "my-x-axis-label")
  .html(function(d, i) {
    var timeDiv = '<span class="tick-time">' + d3.timeFormat('%H:%M:%S')(new Date(d)) + '</span>';

    // Check if the current tick value is the first or last value, or if the date has changed
    if (i === 0 || i === _this.dataToPlot.length - 1 || _this.dataToPlot[i].date.getDate() !== _this.dataToPlot[i - 1].date.getDate()) {
      var dateDiv = '<span class="tick-date">' + d3.timeFormat('%Y-%m-%d')(new Date(d)) + '</span>';
      return '<div class = "tick-value">' + dateDiv + '<br>' + timeDiv + '</div>';
    } else {
      return '<div class = "tick-value">' + '<br>' + timeDiv + '</div>';
    }
  });


    // Add the Y Axis
    svg.append('g')
    .attr('class', 'grid')
    .call(yAxis);

    //hovering
    var tooltip = d3.select(`#${chartId}`)
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('border', '1px solid black')
    .style('border-radius', '5px');

    var tooltipCircle = svg
    .append('circle')
    .attr("class", "tooltip-circle")
    .attr("r", 5)
    .style("fill", "steelblue")
    .style("opacity", 0);

      // Select all elements with class "line" and add a mouseover event listener
      d3.select(`#${chartId}`)
      .on('mouseover', function () {
        // Set the opacity of the tooltip to 1 (i.e. make it visible)
        tooltip.style('opacity', 1);
      })
      .on('mousemove', function (event) {
        tooltip.style('opacity', 1);

        // Get the x and y coordinates of the mouse pointer relative to the SVG element
        var mouseX = d3.pointer(event)[0];
        var mouseY = d3.pointer(event)[1];
        var mouseX = d3.pointer(event)[0] ;
        var mouseY = d3.pointer(event)[1];
        var minValuex = Math.min.apply(Math, _this.dataToPlot.map(function(o) { return o.date.getTime(); }));

        // Convert the x and y coordinates of the mouse pointer to their corresponding data values on the chart
        var x0 = _this.chartProps.x.invert(mouseX-198);
        const i = closestIndex(x0, _this.dataToPlot);

        var d: HeartSkinRateData = _this.dataToPlot[i] as HeartSkinRateData;

        // Set the content and position of the tooltip based on the closest data point to the x value of the mouse pointer
        tooltip.html('Value: ' + d.rate + "<br>" + "Time: " + d3.timeFormat('%H:%M:%S')(d.date))
          .style('left', (event.pageX-275) + 'px')
          .style('top', (event.pageY -135) + 'px');
        
        tooltip.style('opacity', 1);  

        tooltipCircle
        .attr("cx", _this.chartProps.x(d.date.getTime()))
        .attr("cy", _this.chartProps.y(d.rate))
        .style("opacity", 1);
      })
      .on('mouseout', function () {
        // Set the opacity of the tooltip back to 0 (i.e. hide it)
        tooltip.style('opacity', 0);
      })

    // Setting the required objects in chartProps so they could be used to update the chart
    this.chartProps.svg = svg;
    this.chartProps.valueline = valueline;
    // this.chartProps.tooltip = tooltip;
    // this.chartProps.tooltipCicle = tooltipCircle
    this.chartProps.margin = margin;
    this.chartProps.xAxis = xAxis;
    this.chartProps.yAxis = yAxis;
  }

  removeChart(graphNumber: number) {
    const chartContainer = document.getElementById(`chart-${graphNumber}`);
    if (chartContainer && chartContainer.parentNode)
      this.chartElement.nativeElement.removeChild(chartContainer);
  }

  removeAllCharts() {
    for (let i = 0; i < 7; ++i) {
      this.removeChart(i);
    }
  }

  updateChartHeartSkin(latestDataPoint: HeartSkinRateData | BrainSensorData | IMUSensorData) {
    latestDataPoint.date = new Date(latestDataPoint.date);
    //buildChartHeartSkin
    let _this = this;
    // remove first data point
    if (this.dataToPlot[0].date.getTime() < latestDataPoint.date.getTime() - this.minutesToShow * 60000  )
      this.dataToPlot.shift();
    // add new data point
    switch (this.curIcon) {
      case 1:
        latestDataPoint = latestDataPoint as BrainSensorData;
        (this.dataToPlot as BrainSensorData[]).push(latestDataPoint);
        break;
      case 2:
        latestDataPoint = latestDataPoint as HeartSkinRateData;
        (this.dataToPlot as HeartSkinRateData[]).push(latestDataPoint);
        break;
      case 3:
        latestDataPoint = latestDataPoint as IMUSensorData;
        (this.dataToPlot as IMUSensorData[]).push(latestDataPoint);
        break;
      case 4:
        latestDataPoint = latestDataPoint as HeartSkinRateData;
        (this.dataToPlot as HeartSkinRateData[]).push(latestDataPoint);
        break;
    }
      
    // Scale the range of the data again
        
    this.chartProps.x.domain(
      [Math.min.apply(Math, _this.dataToPlot.map(function(o) { return new Date(o.date).getTime(); })), 
        Math.max.apply(Math, this.dataToPlot.map(function(o) { return new Date(o.date).getTime(); }))]);  

    this.chartProps.y.domain(
      [Math.min(0, Math.min.apply(Math, _this.dataToPlot.map(function(o) { return o.rate; }))), 
        Math.max.apply(Math, this.dataToPlot.map(function(o) { return o.rate; }))]);  

    // Select the section we want to apply our changes to
    this.chartProps.svg.transition();


    // Make the changes to the line chart
    this.chartProps.svg.select('.line.line1') // update the line
      .attr('d', this.chartProps.valueline(this.dataToPlot));
  
    // this.chartProps.svg.select('.line.line2') // update the line
    //   .attr('d', this.chartProps.valueline2(this.marketStatusToPlot));
  
    this.chartProps.svg.select('.x.axis') // update x axis
    .call(this.chartProps.xAxis);

    var tx = -25;
    var ty = -18;
    var tw = 100;
    // Select the x-axis element and all foreign objects appended to ticks
    this.chartProps.svg.select('.x.axis')
    .call(this.chartProps.xAxis.ticks(5))
    .selectAll("g")
    .selectAll(".my-x-axis-label") // select all existing tick labels
    .data(function(d, i) { return [d]; }) // bind the data to the selection
    .enter() // enter the selection
    .append("svg:foreignObject")
    .attr("width", tw)
    .attr("height", 60)
    .attr("x", tx)
    .attr("y", ty)
    .append("xhtml:div")
    .attr("class", "my-x-axis-label")
    .html(function(d, i) {
      var timeDiv = '<span class="tick-time">' + d3.timeFormat('%H:%M:%S')(new Date(d)) + '</span>';
      return '<div class = "tick-value">' + '<br>' + timeDiv + '</div>';
    });
  
    this.chartProps.svg.select('.y.axis') // update y axis
      .call(this.chartProps.yAxis);

    this.chartProps.svg.select('path').style('stroke', this.curColor)
  }


  updateChartMuse(latestDataPoint: HeartSkinRateData | BrainSensorData | IMUSensorData) {
    latestDataPoint.date = new Date(latestDataPoint.date);
    if (this.dataToPlot[0].date.getTime() < latestDataPoint.date.getTime() - this.minutesToShow * 60000  )
      this.dataToPlot.shift();
    // add new data point
    switch (this.curIcon) {
      case 1:
        latestDataPoint = latestDataPoint as BrainSensorData;
        (this.dataToPlot as BrainSensorData[]).push(latestDataPoint);
        break;
      case 2:
        latestDataPoint = latestDataPoint as HeartSkinRateData;
        (this.dataToPlot as HeartSkinRateData[]).push(latestDataPoint);
        break;
      case 3:
        latestDataPoint = latestDataPoint as IMUSensorData;
        (this.dataToPlot as IMUSensorData[]).push(latestDataPoint);
        break;
      case 4:
        latestDataPoint = latestDataPoint as HeartSkinRateData;
        (this.dataToPlot as HeartSkinRateData[]).push(latestDataPoint);
        break;
    }

    for (let i = 0; i < this.museSelected.length; ++i) {
      let graphNumber = this.museSelected[i];
      var chartProps = this.chartProps[i];
      if (i < this.museSelected.length-1)
        this.updateMuseChartComponent(latestDataPoint, i, false);
      else
        this.updateMuseChartComponent(latestDataPoint, i, true);
    }
  }

  updateMuseChartComponent(latestDataPoint: HeartSkinRateData | BrainSensorData | IMUSensorData, i: number, isLast: boolean) {
    //buildChartHeartSkin
    let _this = this;
    var chartProps = this.chartProps[i];
    let graphNumber = this.museSelected[i];
    let colors = ['blue','green', 'red', 'violet', 'orange'];
    let color = colors[graphNumber-1];
    // Scale the range of the data again
    chartProps.x.domain(
      [Math.min.apply(Math, _this.dataToPlot.map(function(o) { return o.date.getTime(); })), 
        Math.max.apply(Math, this.dataToPlot.map(function(o) { return o.date.getTime(); }))]);  
    chartProps.y.domain(
      [Math.min(0, Math.min.apply(Math, _this.dataToPlot.map(function(o) { 
        switch(graphNumber) {
          case 1: 
            return o.TP9; 
          case 2: 
            return o.AF7; 
          case 3: 
            return o.AF8; 
          case 4:
            return o.TP10;
          case 5:
            return o.RightAUX;
          default:
            throw new Error("Trying to plot muse/brain data but data does not have any brain data (TP9, AF7,...)");
        }
      }))), 
        Math.max.apply(Math, this.dataToPlot.map(function(o) { 
          switch(graphNumber) {
            case 1: 
              return o.TP9; 
            case 2: 
              return o.AF7; 
            case 3: 
              return o.AF8; 
            case 4:
              return o.TP10;
            case 5:
              return o.RightAUX;
            default:
              throw new Error("Trying to plot muse/brain data but data does not have any brain data (TP9, AF7,...)");
          }
         }))]);  

    // Select the section we want to apply our changes to
    chartProps.svg.transition();


    // Make the changes to the line chart
    chartProps.svg.select('.line.line1') // update the line
      .attr('d', chartProps.valueline(this.dataToPlot));
  
    // this.chartProps.svg.select('.line.line2') // update the line
    //   .attr('d', this.chartProps.valueline2(this.marketStatusToPlot));
  
    if (isLast) {
      chartProps.svg.select('.x.axis') // update x axis
      .call(chartProps.xAxis);

      var tx = -25;
      var ty = -18;
      var tw = 100;
      // Select the x-axis element and all foreign objects appended to ticks
      chartProps.svg.select('.x.axis')
        .call(chartProps.xAxis.ticks(5))
        .selectAll("g")
        .selectAll(".my-x-axis-label") // select all existing tick labels
        .data(function(d, i) { return [d]; }) // bind the data to the selection
        .enter() // enter the selection
        .append("svg:foreignObject")
        .attr("width", tw)
        .attr("height", 60)
        .attr("x", tx)
        .attr("y", ty)
        .append("xhtml:div")
        .attr("class", "my-x-axis-label")
        .html(function(d, i) {
          var timeDiv = '<span class="tick-time">' + d3.timeFormat('%H:%M:%S')(new Date(d)) + '</span>';
          return '<div class = "tick-value">' + '<br>' + timeDiv + '</div>';
      });
    } 
  
    chartProps.svg.select('.y.axis') // update y axis
      .call(chartProps.yAxis);

    chartProps.svg.select('path').style('stroke', color);
  }

  updateChartIMU(latestDataPoint: HeartSkinRateData | BrainSensorData | IMUSensorData) {
    latestDataPoint.date = new Date(latestDataPoint.date);
    if (this.dataToPlot[0].date.getTime() < latestDataPoint.date.getTime() - this.minutesToShow * 60000  )
      this.dataToPlot.shift();
    // add new data point
    switch (this.curIcon) {
      case 1:
        latestDataPoint = latestDataPoint as BrainSensorData;
        (this.dataToPlot as BrainSensorData[]).push(latestDataPoint);
        break;
      case 2:
        latestDataPoint = latestDataPoint as HeartSkinRateData;
        (this.dataToPlot as HeartSkinRateData[]).push(latestDataPoint);
        break;
      case 3:
        latestDataPoint = latestDataPoint as IMUSensorData;
        (this.dataToPlot as IMUSensorData[]).push(latestDataPoint);
        break;
      case 4:
        latestDataPoint = latestDataPoint as HeartSkinRateData;
        (this.dataToPlot as HeartSkinRateData[]).push(latestDataPoint);
        break;
    }

    for (let i = 0; i < this.imuData.length; ++i) {
      this.updateIMUChartComponent(latestDataPoint, i);
    }
  }

  updateIMUChartComponent(latestDataPoint: HeartSkinRateData | BrainSensorData | IMUSensorData, i: number) {
    //buildChartHeartSkin
    let _this = this;
    var chartProps = this.chartProps[i];
    let graphNumber = this.imuData[i];
    let colors = ['blue','green', 'pink'];
    let color = colors[graphNumber-1];
    // Scale the range of the data again
    chartProps.x.domain(
      [Math.min.apply(Math, _this.dataToPlot.map(function(o) { return o.date.getTime(); })), 
        Math.max.apply(Math, this.dataToPlot.map(function(o) { return o.date.getTime(); }))]);  

    chartProps.y.domain(
      [Math.min(0, Math.min.apply(Math, _this.dataToPlot.map(function(o) { 
        switch(graphNumber) {
          case 1: 
            return Math.min(...o.acceleration); 
          case 2: 
            return Math.min(...o.orientation); 
          case 3: 
            return Math.min(...o.magnetic); 
          case 4:
            return Math.min(...o.gyro); 
          case 5:
              return Math.min(...o.linear); 
          case 6:
            return Math.min(...o.gravity); 
          default:
            throw new Error("Trying to plot imu data but data does not have any brain data (acceleration, orientation,...)");
        }
      }))), 
        Math.max.apply(Math, this.dataToPlot.map(function(o) { 
          switch(graphNumber) {
            case 1: 
              return Math.max(...o.acceleration); 
            case 2: 
              return Math.max(...o.orientation); 
            case 3: 
              return Math.max(...o.magnetic); 
            case 4:
              return Math.max(...o.gyro); 
            case 5:
                return Math.max(...o.linear); 
            case 6:
              return Math.max(...o.gravity); 
            default:
              throw new Error("Trying to plot imu data but data does not have any brain data (acceleration, orientation,...)");
          }
         }))]);  

    // Select the section we want to apply our changes to
    chartProps.svg.transition();

    // Make the changes to the line charts
    var valueLines = chartProps.valueLines;
    for (let i = 0; i < valueLines.length; ++i) {
      var coordinate = this.imuAxes[i];
      var valueLine = valueLines[i](coordinate);
      chartProps.svg.select(`.line.line${i+1}`) // update the line
        .style('stroke', colors[coordinate-1])
        .style('fill', 'none')
        .attr('d', valueLine(this.dataToPlot));
    }
    
  
    // this.chartProps.svg.select('.line.line2') // update the line
    //   .attr('d', this.chartProps.valueline2(this.marketStatusToPlot));
  
    chartProps.svg.select('.x.axis') // update x axis
    .call(chartProps.xAxis);

    var tx = -25;
    var ty = -18;
    var tw = 100;
    // Select the x-axis element and all foreign objects appended to ticks
    chartProps.svg.select('.x.axis')
      .call(chartProps.xAxis.ticks(5))
      .selectAll("g")
      .selectAll(".my-x-axis-label") // select all existing tick labels
      .data(function(d, i) { return [d]; }) // bind the data to the selection
      .enter() // enter the selection
      .append("svg:foreignObject")
      .attr("width", tw)
      .attr("height", 60)
      .attr("x", tx)
      .attr("y", ty)
      .append("xhtml:div")
      .attr("class", "my-x-axis-label")
      .html(function(d, i) {
        var timeDiv = '<span class="tick-time">' + d3.timeFormat('%H:%M:%S')(new Date(d)) + '</span>';
        return '<div class = "tick-value">' + '<br>' + timeDiv + '</div>';
    });
    
  
    chartProps.svg.select('.y.axis') // update y axis
      .call(chartProps.yAxis);

    // chartProps.svg.select('path').style('stroke', color);
  }

  
}

function closestIndex(num: number, arr: HeartSkinRateData[] | BrainSensorData[] | IMUSensorData[]) {
  let index = 0;
  let curMinDiff = Math.abs(num - arr[index].date.getTime());
  for (let val = 0; val < arr.length; val++) {
     let newdiff = Math.abs(num - arr[val].date.getTime());
     if (newdiff < curMinDiff) {
        curMinDiff = newdiff;
        index = val;
     };
  };
  return index;
}


