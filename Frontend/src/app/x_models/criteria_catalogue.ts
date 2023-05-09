import { Injectable } from "@angular/core";

Injectable({
  providedIn: 'root'
})

  

export class Criteria_Catalogue {
    order?: String;
    sequence?: String;
    weight_value?: any; 
    assembly_sequence?: String;
    criteria_type?: any;
   
    published?: boolean;
  }
  