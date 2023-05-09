import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts-gantt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-assembly-sequences',
  templateUrl: './assembly-sequences.component.html',
  styleUrls: ['./assembly-sequences.component.css']
})
export class AssemblySequencesComponent implements OnInit {

  selected = ""
  data_variant_one : any
  data_variant_two : any

  project: string = "";

  constructor() { }

  ngOnInit(): void {
    this.project = environment.project; 
  }

  calculatePlanning()
  {
    switch(this.selected){
      case "variant_one":
        console.log("Variante 1 wurde ausgewählt");
        this.data_variant_one = [
          {
            id: 'a',
            name: 'Joining Duplo_8x2 with Duplo_2x2_blue to sub-assembly 1',
            start: Date.UTC(2014, 10, 20, 0, 10, 0),
            end: Date.UTC(2014, 10, 20, 0,15,0),
            color: "lightblue",
            assignee: "Resource: Human"
          }, {
            id: 'b',
            name: 'Joining Duplo_4x2 with Duplo_2x2_red to sub-assembly 2',
            start: Date.UTC(2014, 10, 20, 0,10,0),
            end: Date.UTC(2014, 10, 20, 0,18,0),
            color: "lightgreen",
            assignee: "Resource Robot",
            dependency: 's'
          },{
              id: 'c',
              name: 'Joining sub-assembly 1 with sub-assembly 2 and component Duplo_2x2_green to final product',
              start: Date.UTC(2014, 10, 20, 0,18,0),
              end: Date.UTC(2014, 10, 20, 0,22, 0),
              color: 'lightblue',
              dependency: ["a", "b"],
              assignee: "Resource Human"
            }
        ]
        this.highchartclick(this.data_variant_one) 
        break;
      case "variant_two":
        console.log("Varainte 2 wurde ausgewählt");
        this.data_variant_two = [
          {
            id: 'a',
            name: 'Joining Duplo_8x2 with Duplo_2x2_blue to sub-assembly 1',
            start: Date.UTC(2014, 10, 20, 0, 10, 0),
            end: Date.UTC(2014, 10, 20, 0,18,0),
            color: "lightgreen",
            assignee: "Ressource: Robot"
          }, {
            id: 'b',
            name: 'Joining Duplo_4x2 with Duplo_2x2_red to sub-assembly2',
            start: Date.UTC(2014, 10, 20, 0,10,0),
            end: Date.UTC(2014, 10, 20, 0,15,0),
            dependency: 's',
            assignee: "Resource: Human",
            color: "lightblue"
          },{
              id: 'c',
              name: 'Joining sub-assembly 1 with sub-assembly 2 and component Duplo_2x2_green to final product',
              start: Date.UTC(2014, 10, 20, 0,18,0),
              end: Date.UTC(2014, 10, 20, 0,22, 0),
              color: 'lightblue',
              assignee: "Resource: Human",
              dependency: ["a", "b"],
            }
        ]
        this.highchartclick(this.data_variant_two)
    }

  }

  @ViewChild('divRef', { static: false })
  divReference!: ElementRef;
  divReference1!: ElementRef;
  ngAfterViewInit() {
    //this.highchartclick(this.data_variant_one);
 }

  highchartclick(data_e : any) {
    Highcharts.ganttChart(this.divReference.nativeElement as HTMLElement, {
      title: {
        text: 'Assembly Sequence Duplo Use Case'
        
      },
      chart: { renderTo: this.divReference.nativeElement as HTMLElement },
      xAxis: {
        min: Date.UTC(2014, 10, 20, 0, 10, 0),
        max: Date.UTC(2014, 10, 20, 0, 30, 0)
      },
      plotOptions: {
        gantt: {
          dataLabels: {
            enabled: true,
            format: "{point.assignee}"
          },
        }
      },
      
      
      series: [
        {
          name: this.project,
          type: "gantt",
          data: data_e
        }]
    });

   

  }

  
  

}
