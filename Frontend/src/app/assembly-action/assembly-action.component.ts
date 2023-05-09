import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { IntegerType } from 'mongodb';
import { environment } from 'src/environments/environment';
import * as internal from 'stream';

export interface PeriodicElement {
  number: IntegerType,
  module: string;
  components: string[];
  assembly_action: string;
  assembly_description: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {number: 1, module: 'Sub-assembly 1', components: ["Duplo_2x2_blue", "Duplo_8x2"], assembly_action: "aloa", assembly_description: "-"},
  {number: 2, module: 'Sub-assembly 2',  components: ["Duplo_2x2_red", "Duplo_4x2"], assembly_action: "aloa", assembly_description: "-"},
  {number: 3, module: 'Final product', components: ["Sub-assembly 1", "Sub-assembly 2", "Dupplo_2x2_green"], assembly_action: "aloa", assembly_description: "-"}
]

const MAPPING_TABLE_ACTIONS = new Map<string,string>;
MAPPING_TABLE_ACTIONS.set("Screwing", "Screwing")
MAPPING_TABLE_ACTIONS.set("Joining", "Joining")
MAPPING_TABLE_ACTIONS.set("Bonding", "Bonding")

@Component({
  selector: 'app-assembly-action',
  templateUrl: './assembly-action.component.html',
  styleUrls: ['./assembly-action.component.css']
})
export class AssemblyActionComponent implements OnInit {


  project : String = ""; 

  constructor() { }

  ngOnInit(): void {

    this.project = environment.project;
  }

  createAssemblyDescription(action:any, element:any)
  {
    let sentence = ""
    sentence += MAPPING_TABLE_ACTIONS.get(action) + " "
    for(var val of element.components)
    {
      if(element.components[element.components.length-1] === val)
      {
        sentence = sentence + val + " "
      }
      else if(element.components[0] === val){
        sentence = sentence + val + " with "
      }
      else if (element.components.length > 1)
      {
        sentence = sentence + val + " and "
      }  
    }

    return sentence

  }

  onChange(ob:any, element:any){

    console.log(ob.target.value, element);
    element.assembly_action = ob.target.value
    if (ob.target.value !== "Please select")
    {
      element.assembly_description = this.createAssemblyDescription(ob.target.value, element)
    }
    

  }

  displayedColumns: string[] = ['number', "module", "components", "assembly_action", "assembly_description"];
  dataSource = ELEMENT_DATA;

}
function elseif(arg0: boolean) {
  throw new Error('Function not implemented.');
}

