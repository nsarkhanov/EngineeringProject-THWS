import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY } from '@angular/material/tooltip';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { MTM_Human } from './MTM';

export interface PeriodicElement {
  action: string;
  operation: string;
  time_human: string;
  time_robot: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
  {action: "1.0 Joining component Duplo_2x2_blue with component Duplo_8x2", operation: "",  time_human: '4,7', time_robot: "8"},
  

  {action: "2.0 Joining component Duplo_2x2_red with component Duplo_4x2", operation: "", time_human: '4,7', time_robot: "8"},

  {action: "3.0 Joining Sub-assembly 1 with sub-assembly 2 and component Duplo_2x2_green", operation: "", time_human: '3,6', time_robot: "10"},

 


]





@Component({
  selector: 'app-cyclic-time',
  templateUrl: './cyclic-time.component.html',
  styleUrls: ['./cyclic-time.component.css']
})
export class CyclicTimeComponent implements OnInit {

  arrayBuffer : any;
  file = "/home/fabian/Desktop/KoPro/Planning_Algorithm/Code/Dashboard/dashboard_KoPro/src/assets/tables/MTM-UAS.xlsx";

  project : string = "";

  constructor(private http: HttpClient, public MTM_human : MTM_Human) { }
  data : any = {};
  


  ngOnInit(): void {
    //console.log(this.MTM_human.findPosPicknPlace(3, "<=1kg", "difficult", "loose"))
    console.log(this.MTM_human.body("walk", 2))
    this.project = environment.project;
    
}

  displayedColumns: string[] = ['action', 'operation', 'Time human [s] (MTM)', 'Time robot [s] (simulation)'];
  dataSource = ELEMENT_DATA;
}
