import { Injectable } from "@angular/core";
import { StringExpression } from "mongoose";

Injectable({
  providedIn: 'root'
})


export class ASP {
        job_name?: String;
        job_number?: any;
        assembly_sequence_plan?: any; 
        components?: any;
        sub_assembly?: any;
        final_product?: any;

        published?: boolean;
  }
  