import { Component, OnInit } from '@angular/core';
import { Assembly_order } from '../x_models/assembly_order.model';
import { MongoClientService } from '../mongodb.service';
import { MTM_Human } from '../cyclic-time/MTM';
import { _isTestEnvironment } from '@angular/cdk/platform';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  data!: Array<any>;
  selected = "Selection of Use Cases"

  constructor(){}


  //test envrionment 
  ngOnInit(): void {
    
  }

  LoadData(){

    environment.project = this.selected;
    
    switch (this.selected){
      case "FHWS Duplo Use Case STEP AP242":
        this.data = [
          { description: 'Duplo_2x2_rot', Pic: "../../assets/images/STEP_242/DUPLO_ROT_2X2_AP242_stp.png"},
          { description: 'Duplo_2x2_grün', Pic: "../../assets/images/STEP_242/DUPLO_GRUEN_2X2_AP242_stp.png"},
          { description: 'Duplo_2x2_blau', Pic: "../../assets/images/STEP_242/DUPLO_BLAU_2X2_AP242_stp.png"},
          { description: 'Duplo_4x2', Pic: "../../assets/images/STEP_242/DUPLO_GELB_4X2_AP242_stp.png"},
          { description: 'Duplo_8x2', Pic: "../../assets/images/STEP_242/DUPLO_BLAU_8X2_AP242_stp.png"}
        ]
        break;
      case "FHWS Duplo Use Case STEP AP214":
        this.data = [
          { description: 'Duplo_2x2_rot', Pic: "../../assets/images/STEP_242/DUPLO_ROT_2X2_AP242_stp.png"},
          { description: 'Duplo_2x2_grün', Pic: "../../assets/images/STEP_242/DUPLO_GRUEN_2X2_AP242_stp.png"},
          { description: 'Duplo_2x2_blau', Pic: "../../assets/images/STEP_242/DUPLO_BLAU_2X2_AP242_stp.png"},
          { description: 'Duplo_4x2', Pic: "../../assets/images/STEP_242/DUPLO_GELB_4X2_AP242_stp.png"},
          { description: 'Duplo_8x2', Pic: "../../assets/images/STEP_242/DUPLO_BLAU_8X2_AP242_stp.png"}
        ]
        break;
      case "FHWS Duplo Use Case STEP AP203":
        console.log("Trigger for fhws is activated");
        this.data = [
          { description: 'Duplo_2x2_rot', Pic: "../../assets/images/STEP_203/DUPLO_ROT_2X2_AP203_stp.png"},
          { description: 'Duplo_2x2_grün', Pic: "../../assets/images/STEP_203/DUPLO_ROT_2X2_AP203_stp.png"},
          { description: 'Duplo_2x2_blau', Pic: "../../assets/images/STEP_203/DUPLO_ROT_2X2_AP203_stp.png"},
          { description: 'Duplo_4x2', Pic: "../../assets/images/STEP_203/DUPLO_GELB_4X2_AP203_stp.png"},
          { description: 'Duplo_8x2', Pic: "../../assets/images/STEP_203/DUPLO_BLAU_8X2_AP203_stp.png"}
        ]
        break;
      case "wittenstein":
        this.data = []
        console.log("Trigger for wittenstein is activated");
        break;
      case "uhlmann_und_zacher":
        this.data = []
        console.log("Trigger for uhlmann und zacher is activated");
        break;
      case "frisenius":
        this.data = []
        console.log("Trigger for frisenius is activated");
        break;
      case "de_software_and_control":
        this.data = []
        console.log("Trigger for de software and control is activated");
        break;
      case "universal_robots":
        this.data = []
        console.log("Trigger for universal robots is activated");
        break;
    }
      

  }

}

