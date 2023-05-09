import { sequence } from "@angular/animations";
import { NONE_TYPE } from "@angular/compiler";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core"
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { environment } from "src/environments/environment";
import { MongoClientService } from "../mongodb.service";
import { Criteria_Catalogue } from "../x_models/criteria_catalogue";

export interface PeriodicElement {
  description: string;
  criteria: string;
  weight: string[];
  symbol: string;
}
// {criteria: "K1", description: 'Möglichkeit des Verhakens beim Fügen', weight: ["ja", "nein"], symbol: 'H'},
// {criteria: "K2", description: 'Während des Fügens Parallelprozess sichern', weight: ["nötig", "nicht nötig"], symbol: 'He'},
// {criteria: "K3", description: 'Sichern nach dem Fügen', weight: ["nötig", "nicht nötig"], symbol: 'Li'},
// {criteria: "K4", description: 'Kontakt Werkstück / Fügeteil (einzelne Bauteile sollen zueinander eine möglichst geringe Anzahl an Fügestellen haben)', 
// weight: ["Einstellenkontakt", "Mehrstellenkontakt: Ausrichten mehrerer Einzelelemente erforderlich", "Mehrstellenkontakt: System starr, Fügepassung > Werkstücktoleranzen"], symbol: 'Be'},
// {criteria: "K5", description: 'Zusätzliche Prozessschritte durch Anpassarbeiten (z.B. durch mangelnde Bauteilqualität)', weight: ["nicht erforderlich", "teilweise erforderlich"], symbol: 'B'},
// {criteria: "K6", description: 'Prozesskontrolle sensorische Fähigkeiten', weight: ["nicht nötig", "von Mensch und Roboter durchführbar", "vom Menschen durchführbar, Robotersysteme benötigen Zusatzinvest", "vom Roboter durchführbar, Mensch benötigt Zusatzinvest"], symbol: 'C'},
// {criteria: "K7", description: 'Umrüstungsaufwand für Prozesseinrichtung', weight: ["kein Umrüstungsaufwand", "Umrüstungsaufwand nur bei Automatisierung", "Umrüstungsaufwand automatisiert < manuell", "Umrüstungsaufwand automatisiert > manuell", "Umrüstungsaufwand automatisiert = manuell"], symbol: 'N'},
// {criteria: "K8", description: 'Fügebewegung (möglichst einfach)', weight: ["durch Bauteilgeometrie erzwungen", "durch Führung Fügewerkzeug"], symbol: 'O'},
// {criteria: "K9", description: 'Fügepassungen', weight: ["Spielpassung", "Grenzpassung", "Übermaßpassung (ist jeweils nur durch Einlegen in eine Pressvorrichtung möglich)"], symbol: 'F'},
// {criteria: "K10",description: 'Sensorische Unterstützung des Prozesses', weight: ["nicht nötig", "visuelle Unterstützung nötig", "taktile Unterstützung nötig"], symbol: 'Ne'},
// {criteria: "K11", description: 'Hilfs-/ Betriebs-/ Werkstoffe gesundheitsschädlich', weight: ["unschädlich", "bei Berührung", "bei Gegenwart"], symbol: 'H'},
// {criteria: "K12", description: 'Schadstoffeinwirkung von Luftinhaltsstoffen (Stäube, Rauche, Nebel, Gase, Dämpfe, ...)', weight: ["aktuelle zulässige MAK-Werte nicht überschritten", "aktuelle zulässige MAK-Werte überschritten"], symbol: 'He'},
// {criteria: "K13", description: 'Bauteiltemperatur', weight: ["T < 0 °C", "0 °C < T < 44 °C", "T >= 44 °C"], symbol: 'Li'},
// {criteria: "K14", description: 'Physiologische Dauerbelastung des Menschen bei schwerer dynamischer Muskelarbeit', weight: ["gering", "mittel", "hoch"], symbol: 'Be'},
// {criteria: "K15", description: 'Lärmbelästigung am Arbeitsplatz', weight: ["LR < 85 db(A)", "85 db(A0 < LR < 90 dB(A)", "LR > 90 dB(A)"], symbol: 'B'},
// {criteria: "K16", description: 'Zugänglichkeit des Fügeorts', weight: ["Sichtkontrolle und Werkzeugfreiräume gegeben", "keine Sichtkontrolle möglich", "Sichtkontrolle gegeben, keine Werkzeugfreiräume vorhanden"], symbol: 'H'},
// {criteria: "K17", description: 'Greif- und/oder Zentriermöglichkeiten der Bauteile', weight: ["gegeben", "nicht gegeben"], symbol: 'He'},
// {criteria: "K18", description: 'Oberflächenempfindlichkeit des Bauteils', weight: ["Material unempfindlich", "Material kratz-, bruch-, formunempfindlich"], symbol: 'Li'},
// {criteria: "K19", description: 'Steifheit des Fügeteils', weight: ["starr", "elastisch", "biegeschlaff"], symbol: 'Be'},
// {criteria: "K20", description: 'Steifheit des Basisteils', weight: ["starr", "elastisch", "biegeschlaff"], symbol: 'B'},
// {criteria: "K21", description: 'Prozessanpassung auf Grund der Bauteiltoleranz', weight: ["ja (Korrektur von Bauteilposition, Bauteilorientierung, Fügeposition, Fügeorientierung)", "nein"], symbol: 'B'},
// {criteria: "K22", description: 'Bereitstellung der Basis- / Fügeteile', weight: ["positioniert und orientiert bereitgestellt", "einfach und prozesssicher automatisierbar", "nicht prozesssicher automatisierbar"], symbol: 'H'},

const ELEMENT_DATA_PRE: PeriodicElement[] = []; 

const ELEMENT_DATA: PeriodicElement[] = [
  {criteria: "K1", description: 'Possibility of snagging when joining', weight: ["yes", "no"], symbol: 'H'},
  {criteria: "K2", description: 'Secure parallel process during joining', weight: ["necessary", "not necessary   "], symbol: 'He'},
  {criteria: "K3", description: 'Secure after joining', weight: ["necessary ", "not necessary "], symbol: 'Li'},
  {criteria: "K4", description: 'Contact workpiece / joining part (individual components should have as few joints as possible)', 
  weight: ["Single-point contact", "Multi-point contact: Alignment of several individual elements required", "Multi-point contact: system rigid, mating fit > workpiece tolerances"], symbol: 'Be'},
  {criteria: "K5", description: 'Additional process steps through adjustment work (e.g. due to poor component quality)', weight: ["not mandatory", "partially required"], symbol: 'B'},
  {criteria: "K6", description: 'Process control sensory skills', weight: ["not necessary", "can be performed by humans and robots", "can be carried out by humans, robot systems require additional investment", "can be carried out by robots, humans require additional investment"], symbol: 'C'},
  {criteria: "K7", description: 'Conversion effort for process equipment', weight: ["no conversion effort", "Conversion effort only with automation", "Conversion effort automated < manual", "Conversion effort automated > manual", "Conversion effort automated = manual"], symbol: 'N'},
  {criteria: "K8", description: 'Joining movement (as simple as possible)', weight: ["forced by component geometry", "through guide joining tool"], symbol: 'O'},
  {criteria: "K9", description: 'Mating fits', weight: ["clearance fit", "limit fit", "Oversize fit (is only possible by inserting it into a pressing device)  "], symbol: 'F'},
  {criteria: "K10",description: 'Sensory support of the process', weight: ["not necessary", "need visual support", "tactile support needed"], symbol: 'Ne'},
  {criteria: "K11", description: 'Consumables/ operating materials/ materials harmful to health', weight: ["harmless", "on contact", "at present"], symbol: 'H'},
  {criteria: "K12", description: 'Pollutant effects of air constituents (dust, smoke, mist, gases, vapours, ...)', weight: ["current permissible MAK values ​​are not exceeded", "current permissible MAK values ​​exceeded"], symbol: 'He'},
  {criteria: "K13", description: 'Component temperature', weight: ["T < 0 °C", "0 °C < T < 44 °C", "T >= 44 °C"], symbol: 'Li'},
  {criteria: "K14", description: 'Physiological long-term stress in humans during heavy dynamic muscle work', weight: ["small amount", "medium", "high"], symbol: 'Be'},
  {criteria: "K15", description: 'Noise pollution in the workplace', weight: ["LR < 85 db(A)", "85 db(A0 < LR < 90 dB(A)", "LR > 90 dB(A)"], symbol: 'B'},
  {criteria: "K16", description: 'Accessibility of the joining location', weight: ["Visual inspection and tool clearance given", "No visual inspection possible", "Visual inspection given, no tool clearances available"], symbol: 'H'},
  {criteria: "K17", description: 'Gripping and/or centering options for the components', weight: ["given", "not given"], symbol: 'He'},
  {criteria: "K18", description: 'Surface sensitivity of the component', weight: ["material insensitive", "Material scratch-, break-, shape-resistant"], symbol: 'Li'},
  {criteria: "K19", description: 'stiffness of the joining part', weight: ["rigid ", "elastic", "limp"], symbol: 'Be'},
  {criteria: "K20", description: 'Rigidity of the base part', weight: ["rigid", "elastic", "limp"], symbol: 'B'},
  {criteria: "K21", description: 'Process adjustment based on the component tolerance', weight: ["yes (correction of component position, component orientation, joining position, joining orientation)", "no"], symbol: 'B'},
  {criteria: "K22", description: 'Provision of the base / joining parts', weight: ["positioned and oriented provided", "easy and process-safe to automate", "cannot be reliably automated"], symbol: 'H'},
];

@Component({
  selector: 'app-criteria-catalogue',
  templateUrl: './criteria-catalogue.component.html',
  styleUrls: ['./criteria-catalogue.component.css'
  ],
})


export class CriteriaCatalogueComponent implements OnInit {

  selected = "";
  project : string = "";
  submitted : boolean;
  criteria_assembly = new Map <string, string>;
  sequence = "";


  url_criteriaCatalogue : String = environment.url_criteria_catalogue
  data = environment.data_assembly_steps

  


  constructor(
    public service : MongoClientService,
    public criteria_catalogue: Criteria_Catalogue = {
     published: false
   },
   ){
     this.submitted = false
   }

  ngOnInit(): void {
    this.service.setBaseUrl(this.url_criteriaCatalogue)
    this.project = environment.project;
  }




  onChangeRadio(ob: any, criteria:any)
  {
    this.criteria_assembly.set(criteria, ob.target.name)
    console.log(this.criteria_assembly)
  }

  saveData()
  {
    if (this.sequence!=="")
    {
      this.saveDataCriteriaCatalogueMongoDb()
    }
  }

  loadData(ob: any) {
    this.refreshPage()
    //this.criteria_catalogue = {}
    this.criteria_assembly.clear()
    console.log("Ergebnis der Auswahl: " + ob)
    this.sequence = ob
    this.GetEntryMongoDb(this.sequence)
    this.clearRadioButton()
  }

  refreshPage()
  {
    this.dataSource = ELEMENT_DATA
  }

  saveDataCriteriaCatalogueMongoDb()
  {
    this.criteria_catalogue = {
      order: this.project,
      sequence: this.sequence,
      weight_value: Object.fromEntries(this.criteria_assembly),
      criteria_type: "assembly",
      published: true,
      
    };
   
    this.CheckSendUpdataMongoDb(this.criteria_catalogue)
  }

  CheckSendUpdataMongoDb(data:any)
  {
    this.service.get(data.sequence, this.project)
      .subscribe(
        response => {
          if (response[0]===undefined)
          {
            console.log("keine Daten vorhanden - Daten werden neu gesendet")
            this.sendDataToMongoDb(data)
          }
          else {
            console.log("Daten vorhanden - Daten werden lediglich geupdatet")
            this.UpdateMongoDb(data.sequence, data)
            this.submitted = true;
          }
          
        },
        error => {
          console.log(error);
        });
  }

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

  UpdateMongoDb(sequence:any, data:any)
  {
    this.service.update(sequence, data)
      .subscribe(
        response => {
          this.submitted = true;
          console.log(response)
          this.refreshPage()
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
            this.clearRadioButton()
          }
          else {
            console.log(response[0].weight_value);
            this.setRadioButton(response[0].weight_value)
            this.submitted = true;
          }
          
          //this.refreshPage()
        },
        error => {
          console.log(error);
        });
  }

  /**
   * 
   * @param data 
   */
  setRadioButton(data:any)
  {
    this.clearRadioButton()
 
    for (let [key, value] of Object.entries(data))
    {
      let value_data : string = value +  key;
      this.criteria_assembly.set(key, data[key])
      console.log("Ausgabe Radio" + key);
      (<HTMLInputElement>document.getElementById(value_data)).checked = true;
    }
    
  }

  /**
   * Clear all Radio Buttons
   */
  clearRadioButton()
  {
    for (let index in ELEMENT_DATA)
    {
      for (let _index in ELEMENT_DATA[index].weight)
      {
         (<HTMLInputElement>document.getElementById(ELEMENT_DATA[index].weight[_index]+ELEMENT_DATA[index].description)).checked = false;
      }
    }
  }



  displayedColumns: string[] = ['criteria', 'description', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA_PRE;

}
