import { Injectable } from "@angular/core";

Injectable({
  providedIn: 'root'
})


export class Skill_matrix_human {
    id?: any;
    name?: String;
    surname?: String;
    size?: String; 
    arm_length?: String;
    priority_arm?: String;
    skills?: Array<String>

    published?: boolean;
  }
  