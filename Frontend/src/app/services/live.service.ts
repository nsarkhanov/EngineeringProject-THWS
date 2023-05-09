import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs' 
import { MarketPrice } from '../market-price';

@Injectable({
  providedIn: 'root'
})
export class LiveService {
  private displayGraph: number = 1;
  private showAddTask: boolean = false;
  private marketStatusToPlot: MarketPrice[];
  private graphSubject = new Subject<any>();
  private titleSubject = new Subject<any>();
  private curTitle: string = "Brain wave sensor";
  private allTitles = ["Muse sensor", "Heart rate sensor", "IMU sensor", "Skin Sensor"];

  private startTime: Date;
  private endTime: Date;
  private startTimeSubject = new Subject<any>();
  private endTimeSubject = new Subject<any>();

  private museSelected: number[] = [1, 2, 3, 4, 5];//['TP9', 'AF7','AF8','TP10','RightAUX']
  private museSubject = new Subject<any>();

  private imuData: number[] = [1]; // ['Acceleration', 'Orientation','Magnetic','Gyro','Linear','Gravity']
  private imuAxes: number[] = [1]; // ['X-Axis', 'Y-Axis', 'Z-Axis']
  private imuSensor: number = 1; // ['Left hand', 'Right hand', 'Left foot', 'Right foot']
  private imuDataSubject = new Subject<any>();
  private imuAxesSubject = new Subject<any>();
  private imuSensorSubject = new Subject<any>();


  private subject = new Subject<any>();
  constructor() { }

  changeDisplayGraph(i : number) {
    this.displayGraph = i;
    this.curTitle = this.allTitles[i-1];
    this.titleSubject.next(this.curTitle);
    this.graphSubject.next(this.displayGraph);
    return this.curTitle;
  }

  changeMuseSelected(graphNumbers: String[]) {
    console.log("In live service: " + graphNumbers[0] + " dede " + graphNumbers[1]);
    // ['TP9', 'AF7','AF8','TP10','RightAUX']
    var museSelected: number[] = graphNumbers.map(d => {
      switch(d) {
        case 'TP9':
          return 1;
        case 'AF7':
          return 2;
        case 'AF8':
          return 3;
        case 'TP10':
          return 4;
        case 'RightAUX':
          return 5;
        default:
          return -1;
      }
    });
    this.museSelected = museSelected;
    this.museSubject.next(this.museSelected);
  }

  /**
   * 
   * @param data 
   * @param funktion 0 for data, 1 for axis, 2 for sensor
   */
  changeIMUSelected(data: String[] | String, funktion: number) {
    // ['Acceleration', 'Orientation','Magnetic','Gyro','Linear','Gravity']
    // ['X-Axis', 'Y-Axis', 'Z-Axis']
    // ['Left hand', 'Right hand', 'Left foot', 'Right foot']
    // we first map the string to a number for easier procesing
    if (funktion == 0) {
      var imuData: number[] = (data as String[]).map(d => {
        switch(d) {
          case 'Acceleration':
            return 1;
          case 'Orientation':
            return 2;
          case 'Magnetic':
            return 3;
          case 'Gyro':
            return 4;
          case 'Linear':
            return 5;
          case 'Gravity':
            return 6;
          default:
            return -1;
        }
      });
      this.imuData = imuData;
      this.imuDataSubject.next(this.imuData);
    }
    if (funktion == 1) {
      var imuAxes: number[] = (data as String[]).map(d => {
        switch(d) {
          case 'X-Axis':
            return 1;
          case 'Y-Axis':
            return 2;
          case 'Z-Axis':
            return 3;
          default:
            return -1;
        }
      });
      this.imuAxes = imuAxes;
      this.imuAxesSubject.next(this.imuAxes);
    }


    if (funktion == 2) {
      var imuSensor: number;
      switch(data as String) {
        case 'Left hand':
          imuSensor = 1;
          break;
        case 'Right hand':
          imuSensor = 2;
          break;
        case 'Left foot':
          imuSensor = 3;
          break;
        case 'Right foot':
          imuSensor = 4;
          break;
        default:
          imuSensor = -1;
      };
      this.imuSensor = imuSensor;
      this.imuSensorSubject.next(this.imuSensor);
    }
  }


  /**
   * If start is 0, we changed start time. If it is 1, we changed end time
   * @param start 
   * @param time 
   * @returns 
   */
  changeDisplayTime(start: number, time) {
    console.log("Time is: " + time);
    if (start == 0) {
      this.startTime = time;
      this.startTimeSubject.next(this.startTime);
    }
    if (start == 1) {
      this.endTime = time;
      this.endTimeSubject.next(this.endTime);
    }
    let timeStr = start == 0 ? "Start time" : "End time";
    console.log("This is from the Live Service! " + timeStr +" is " + time);
  }

  getCurrentTitle() {
    return this.curTitle;
  }

  getCurrentDisplayGraph(){
    return this.displayGraph;
  }

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  onGraphChange(): Observable<any> {
    return this.graphSubject.asObservable();
  }

  onMuseChange(): Observable<any> {
    return this.museSubject.asObservable();
  }

  onIMUDataChange(): Observable<any> {
    return this.imuDataSubject.asObservable();
  }

  onIMUAxesChange(): Observable<any> {
    return this.imuAxesSubject.asObservable();
  }

  onIMUSensorChange(): Observable<any> {
    return this.imuSensorSubject.asObservable();
  }

  onTitleChange(): Observable<any> {
    return this.titleSubject.asObservable();
  }

  onstartTimeChange(): Observable<any> {
    return this.startTimeSubject.asObservable();
  }

  onEndTimeChange(): Observable<any> {
    return this.endTimeSubject.asObservable();
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  setMarketStatusToPlot(market: MarketPrice[]) {
    this.marketStatusToPlot = market;
  }

  setStartTime(startTime: Date) {
    this.startTime = startTime;
  }

  setEndTime(endTime: Date) {
    this.endTime = endTime;
  }

  getStartTime() {
    return this.startTime;
  }

  getEndTime() {
    return this.endTime;
  }

  getMarketStatusToPlot() {
    return this.marketStatusToPlot;
  }
}
