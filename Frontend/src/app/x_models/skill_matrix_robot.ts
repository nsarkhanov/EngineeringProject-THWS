import { Injectable } from "@angular/core";

Injectable({
  providedIn: 'root'
})


export class Skill_matrix_robot {
    description?: String;
    range_of_motion?: String;
    payload?: String; 
    speed?: String; 
    acceleration?: String;
    gripper?: String;
    skills?: Array<String>;
    published?: boolean;
  }
  