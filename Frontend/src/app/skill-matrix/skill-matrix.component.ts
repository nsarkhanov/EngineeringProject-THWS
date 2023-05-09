import { DOCUMENT } from '@angular/common';
import { Component, EnvironmentInjector, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { eventNames } from 'process';
import { Skill_matrix_human } from '../x_models/skill_matrix_human';
import { Skill_matrix_robot } from '../x_models/skill_matrix_robot';
import { MongoClientService } from '../mongodb.service';
import { environment } from 'src/environments/environment';


//SKILL MATRIX - Open up the possibility to create a skill matrix for human as well as for robots. 
//Based on the skills the optimization and allocation of the different tasks can be triggered.


@Component({
  selector: 'app-skill-matrix',
  templateUrl: './skill-matrix.component.html',
  styleUrls: ['./skill-matrix.component.css']
})
export class SkillMatrixComponent implements OnInit {

  messages = ["test", "test"]
  mongo_human_data : any;
  mongo_robot_data : any;
  human_skills = new Map<string, string>();
  robot_skills = new Map<string, string>();
  submitted : boolean;
  skill_map_human : Array<String> = [];
  skill_map_robot : Array<String> = [];

  url_human = environment.url_human;
  url_robot = environment.url_robot;
  

  constructor(
    public service : MongoClientService,
    public skill_human: Skill_matrix_human = {
     published: false
   },
    public skill_robot: Skill_matrix_robot = {
      published: false
    }
   ){
     this.submitted = false
   }

  ngOnInit(): void {
    this.refreshPage()
  }

  refreshPage()
  {
    this.showSavedDataHuman()
    this.showSavedDataRobot()
  }

  /**
   * Checkbox data extraction from robot 
   * 
   * Read out the checked skills and transfer it into an array for data preparation
   * @param event 
   */
  onChangeCheckboxRobot(event: MatCheckboxChange)
  {
    console.log("hello checkbox robot" + (event.source.value))
    this.skill_map_robot.push(event.source.value)
  }

  /**
   * Checkbox data extraction from human
   * 
   * Read out the checked skills and transfer it into an array for data preparation
   * @param event 
   */
  onChangeCheckboxHuman(event: MatCheckboxChange)
  {
    console.log("hello checkbox Human" + (event.source.value))
    this.skill_map_human.push(event.source.value)
  }

  /**
   * 
   */
  getHumanSkills(){
    this.human_skills.set("name_human", (<HTMLInputElement>document.getElementById("name_human")).value)
    this.human_skills.set("surname_human", (<HTMLInputElement>document.getElementById("surname_human")).value)
    this.human_skills.set("skill_human", (<HTMLInputElement>document.getElementById("skill_human")).value)
    this.human_skills.set("size_human", (<HTMLInputElement>document.getElementById("size_human")).value)
    this.human_skills.set("arm_length_human", (<HTMLInputElement>document.getElementById("arm_length_human")).value)
    this.human_skills.set("select_arm_human", (<HTMLInputElement>document.getElementById("select_arm_human")).value)
  }

  /**
   * 
   */
  getRobotSkills(){
    this.robot_skills.set("description_robot", (<HTMLInputElement>document.getElementById("description_robot")).value)
    this.robot_skills.set("load_capacity_robot", (<HTMLInputElement>document.getElementById("load_capacity_robot")).value)
    this.robot_skills.set("scope_robot", (<HTMLInputElement>document.getElementById("scope_robot")).value)
    this.robot_skills.set("speed_robot", (<HTMLInputElement>document.getElementById("speed_robot")).value)
    this.robot_skills.set("select_gripper_robot", (<HTMLInputElement>document.getElementById("select_gripper_robot")).value)
    this.robot_skills.set("acceleration_robot", (<HTMLInputElement>document.getElementById("acceleration_robot")).value)
    this.robot_skills.set("select_skill_robot", (<HTMLInputElement>document.getElementById("select_skill_robot")).value)
  }


    /**
   * Load and Display the saved profiles of humans on the screen
   */
  showSavedDataHuman(){
    this.service.setBaseUrl(this.url_human)
    this.mongo_human_data = []
    this.service.getAll().subscribe(response => {
  
      this.mongo_human_data = response
      console.log(this.mongo_human_data);
  
      console.log(response);},
      error => {console.log(error);
      });

      
  }

  /**
   * Load and Display the saved profiles of Robots on the screen
   */
  showSavedDataRobot(){
    this.service.setBaseUrl(this.url_robot)
    this.service.getAll().subscribe(response => {
  
      this.mongo_robot_data = response;
  
      console.log(response);},
      error => {console.log(error);
      });

  }

  /**
   * 
   */
  saveDataRobotMongoDb()
  {
    this.service.setBaseUrl(this.url_robot)
    this.skill_robot = {
      description: this.robot_skills.get("description_robot"),
      range_of_motion: this.robot_skills.get("scope_robot"),
      payload: this.robot_skills.get("payload"),
      speed: this.robot_skills.get("speed_robot"),
      acceleration: this.robot_skills.get("acceleration_robot"),
      gripper: this.robot_skills.get("select_gripper_robot"),
      published: true,
      skills: this.skill_map_robot 
    };
   
    this.sendDataToMongoDb(this.skill_robot)
  }
  
  
  /**
   * 
   * @param data 
   */
  sendDataToMongoDb(data:any)
  {
    this.service.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.refreshPage()
        },
        error => {
          console.log(error);
        });
  }

  /**
   * 
   */
  saveDataHumanMongoDb()
  {
    this.service.setBaseUrl(this.url_human)
    this.skill_human = {
      name : this.human_skills.get("name_human"),
      surname : this.human_skills.get("surname_human"),
      size: this.human_skills.get("size_human"),
      arm_length: this.human_skills.get("arm_length_human"),
      priority_arm: this.human_skills.get("select_arm_human"),
      published: true,
      skills: this.skill_map_human
    };

    this.sendDataToMongoDb(this.skill_human)
    
  }

  /**
   * 
   */
  saveDataHuman(){
    console.log("human data was saved");
    this.getHumanSkills()
    console.log(this.human_skills.get("select_arm_human"))
    this.saveDataHumanMongoDb()

  }
/**
 * 
 */
  saveDataRobot(){
    console.log("robot data was saved");
    this.getRobotSkills()
    console.log(this.robot_skills.get("acceleration"))
    this.saveDataRobotMongoDb()
  }

  


}
