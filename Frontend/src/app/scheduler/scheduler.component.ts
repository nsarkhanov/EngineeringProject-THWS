import { Component, OnInit } from '@angular/core';
import { mixinInitialized } from '@angular/material/core';
import { environment } from 'src/environments/environment';
import { MongoClientService } from '../mongodb.service';
//import { RosTopic } from '../ROS/ROS_topic';
import { ASP } from '../x_models/asp.model';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  submitted : boolean;
  assembly_sequence_plan_ = new Map <string, string>;
  components_ = new Map <string, string>;
  sub_assembly_ = new Map <string, string>;
  final_product_ = new Map <string, string>;

  constructor(
    public service : MongoClientService,
    //public rostopic : RosTopic,
    public assembly_sequence_plan: ASP = {
     published: false
   },
   ){
     this.submitted = false
   }


   mixinInitialized(){
    this.assembly_sequence_plan_.set("Step1", "Joining Duplo ...")
    this.assembly_sequence_plan_.set("step2", "Joining ....")
    this.components_.set("Duplo_2x2_blau", "123")
    this.components_.set("Duplo_8x2_blau", "474574573")
    this.components_.set("Duplo_4x2", "12323213")
    this.sub_assembly_.set("Sub-assembly1", "2324243")
    this.sub_assembly_.set("Subassembly2", "232323")
    this.final_product_.set("Duplo mounted", "99999999999")

   }


  ngOnInit(): void {

    this.mixinInitialized()
    console.log("start initializing ...")

    //console.log("Ausgabe: " + this.rostopic.listener("/chatter"))

    this.assembly_sequence_plan.job_name = "Duplo_use_case";
    this.assembly_sequence_plan.job_number = "1212121212";
    this.assembly_sequence_plan.assembly_sequence_plan = Object.fromEntries(this.assembly_sequence_plan_);
    this.assembly_sequence_plan.components = Object.fromEntries(this.components_);
    this.assembly_sequence_plan.sub_assembly = Object.fromEntries(this.sub_assembly_);
    this.assembly_sequence_plan.final_product = Object.fromEntries(this.final_product_);
    this.service.setBaseUrl(environment.url_assembly_sequence)
    this.sendDataToMongoDb(this.assembly_sequence_plan)


  }



  sendDataToMongoDb(data:any)
  {
    this.service.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

}
