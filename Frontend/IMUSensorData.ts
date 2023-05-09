export class IMUSensorData {
    userID: number;
    sensorID: number;
    acceleration: number[]; 
    orientation: number[];
    gyro: number[];
    magnetic: number[]; 
    linear: number[];
    gravity:number[];
    date: Date; 
}