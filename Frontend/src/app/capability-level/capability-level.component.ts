import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MongoClientService } from '../mongodb.service';
import { Criteria_Catalogue } from '../x_models/criteria_catalogue';




@Component({
  selector: 'app-suitability-level',
  templateUrl: './capability-level.component.html',
  styleUrls: ['./capability-level.component.css']
})
export class CapabiltiyLevelComponent implements OnInit {

  selected = ""
  submitted : boolean
  data = environment.data_assembly_steps;
  project = "";
  criteria_assembly = new Map <string, string>;

  url_criteriaCatalogue : String = "http://localhost:8080/api/criteria_catalogue"

  constructor(
    public service : MongoClientService,
    public criteria_catalogue: Criteria_Catalogue = {}
   ){
     this.submitted = false
   }


  ngOnInit(): void {
    this.service.setBaseUrl(this.url_criteriaCatalogue)
    this.project = environment.project
  }

  loadData(value:any){
    this.GetEntryMongoDb(value)

  }

  UpdateMongoDb(sequence:any, data:any)
  {
    this.service.update(sequence, data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  GetEntryMongoDb(sequence:any)
  {
    this.service.get(sequence, this.project)
      .subscribe(
        response => {
          if (response[0]===undefined)
          {
            console.log("keine Daten vorhanden")
            this.ELEMENT_DATA = []

          }
          else {
            console.log(response[0]);
            this.criteria_catalogue = response[0]
            this.submitted = true;
            this.adaptElementData(this.criteria_catalogue)
          }
          
          //this.refreshPage()
        },
        error => {
          console.log(error);
        });
  }


  calculateHumanSkill(criteria?:any)
  {

    let cycleTimeHuman = this.criteria_assembly.get(criteria+"_TaktzeitM");
    let investHuman = this.criteria_assembly.get(criteria+"_ZusatzinvestM"); 
    let safetyHuman = this.criteria_assembly.get(criteria+"_ProzesssicherheitM");
    let qualityHuman = this.criteria_assembly.get(criteria+"_ArbeitsqualitaetM");

    if (cycleTimeHuman && investHuman && safetyHuman && qualityHuman)
    {
      let value = parseInt(cycleTimeHuman) + parseInt(investHuman) + parseInt(safetyHuman) + parseInt(qualityHuman);
      this.criteria_assembly.set(criteria+"_skillHuman", value.toString());
      (<HTMLInputElement>document.getElementById("skillHuman"+criteria)).value = value.toString()
      this.updateData()
    }
  }

  calculateRobotskill(criteria:any)
  {
    let cycleTimeHuman = this.criteria_assembly.get(criteria+"_TaktzeitR");
    let investHuman = this.criteria_assembly.get(criteria+"_ZusatzinvestR"); 
    let safetyHuman = this.criteria_assembly.get(criteria+"_ProzesssicherheitR");
    let qualityHuman = this.criteria_assembly.get(criteria+"_ArbeitsqualitaetR");

    if (cycleTimeHuman && investHuman && safetyHuman && qualityHuman)
    {
      let value = parseInt(cycleTimeHuman) + parseInt(investHuman) + parseInt(safetyHuman) + parseInt(qualityHuman);
      this.criteria_assembly.set(criteria+"_skillRobot", value.toString());
      (<HTMLInputElement>document.getElementById("skillRobot"+criteria)).value = value.toString()
      this.updateData()
    }

  }

  updateData()
  {
    this.criteria_catalogue.criteria_type = Object.fromEntries(this.criteria_assembly);
    console.log("gesendete Ausgabe: " + this.criteria_catalogue)
    this.UpdateMongoDb(this.criteria_catalogue.sequence, this.criteria_catalogue);
  }

  adaptElementData(_data:any)
  {

    this.ELEMENT_DATA = []
    for (let [key, value] of Object.entries(_data.weight_value))
    {
        this.ELEMENT_DATA.push({criteria: "", skillHuman: "", skillRobot: "", description: key, weight: _data.weight_value[key],  TaktzeitM: "" , ZusatzinvestM: '', ProzesssicherheitM: '', ArbeitsqualitaetM: '', TaktzeitR: '' , ZusatzinvestR: '', ProzesssicherheitR: '', ArbeitsqualitaetR: ''}, )
    
    }

    for (let[key, value] of Object.entries(_data.criteria_type))
    {
      let split_description = key.split("_")[0]
      let split_values = key.split("_")[1]
      console.log(split_description)
      console.log(split_values)
      console.log(value)

      let index = this.ELEMENT_DATA.findIndex(describe => describe.description === split_description)


      switch(split_values) {
        case "TaktzeitM":
          this.ELEMENT_DATA[index].TaktzeitM = String(value);
          break;
        case "ZusatzinvestM":
          this.ELEMENT_DATA[index].ZusatzinvestM = String(value);
          break;
        case "ProzesssicherheitM":
          this.ELEMENT_DATA[index].ProzesssicherheitM = String(value);
          break;
        case "ArbeitsqualitaetM":
          this.ELEMENT_DATA[index].ArbeitsqualitaetM = String(value);
          break;
        case "skillHuman":
          this.ELEMENT_DATA[index].skillHuman = String(value);
          break;
        case "TaktzeitR":
          this.ELEMENT_DATA[index].TaktzeitR = String(value);
          break;
        case "ZusatzinvestR":
          this.ELEMENT_DATA[index].ZusatzinvestR = String(value);
          break;
        case "ProzesssicherheitR":
          this.ELEMENT_DATA[index].ProzesssicherheitR = String(value);
          break;
        case "ArbeitsqualitaetR":
          this.ELEMENT_DATA[index].ArbeitsqualitaetR = String(value);
          break; 
        case "skillRobot":
          this.ELEMENT_DATA[index].skillRobot = String(value);
          break;
      } 
      //this.ELEMENT_DATA.push({criteria: "", skillHuman: "", skillRobot: "", description: split_description, weight: _data.weight_value[split_description],  TaktzeitM: "" , ZusatzinvestM: '', ProzesssicherheitM: '', ArbeitsqualitaetM: '', TaktzeitR: '' , ZusatzinvestR: '', ProzesssicherheitR: '', ArbeitsqualitaetR: ''}, )

    }
  }



  onSearchChange(ob:any, criteria:any)
  {
    let value : string;
    value = criteria + "_" + ob.id 
    this.criteria_assembly.set(value, ob.value)
    this.calculateHumanSkill(criteria)
    this.calculateRobotskill(criteria)
  }

ELEMENT_DATA = [
   {criteria: "", skillHuman: "", skillRobot: "", description: '', weight: "", TaktzeitM: '' , ZusatzinvestM: '', ProzesssicherheitM: '', ArbeitsqualitaetM: '', TaktzeitR: '' , ZusatzinvestR: '', ProzesssicherheitR: '', ArbeitsqualitaetR: ''},
 ]


}
