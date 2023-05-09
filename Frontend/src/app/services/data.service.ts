import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject, from } from  'rxjs';
import { io, Socket } from "socket.io-client";
import { HeartSkinRateData } from 'HeartSkinRateData';
import { DataPoint } from 'DataPoint';
import { BrainSensorData } from 'BrainSensorData';
import { IMUSensorData } from 'IMUSensorData';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private baseUrl =  'http://localhost:8080';
  private oldUrl =  'http://localhost:3000';

  constructor(private httpClient: HttpClient) { 
  }

  getInitialHeartRateData(userId: number) {
    return this.httpClient.get<HeartSkinRateData[]>(`${this.baseUrl}/api/heart_rate/${userId}`);
  }

  getInitialData(userId: number, curGraph: number){
    const routes = ['brain_sensor', 'heart_rate', 'imu_sensor', 'skin_sensor'];
    var route = routes[curGraph-1];
    console.log("Getting data from " + route);
    return this.httpClient.get<HeartSkinRateData[] | BrainSensorData[] | IMUSensorData[]>(`${this.baseUrl}/api/${route}/${userId}`);
  }

  getInitialDataOld() {
    return this.httpClient.get<HeartSkinRateData[] | BrainSensorData[] | IMUSensorData[]>(`${this.baseUrl}/api/heart_rate/1`);
  }

  getUpdates(curGraph: number) {
    let socket = io(this.baseUrl);
    console.log("Connecting");

    socket.emit('unsubscribe');

    socket.emit('subscribe', { graphNumber: curGraph});
    let dataSub = new Subject<HeartSkinRateData | BrainSensorData | IMUSensorData>();
    let dataSubObservable = from(dataSub);

    socket.on('data', (data) => {
      dataSub.next(data.fullDocument);
    });

    const disconnectSocket = () => {
      console.log("Disconecting");
      socket.disconnect();
    };

    return { dataSubObservable, disconnectSocket };
  }
}
