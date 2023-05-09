import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-priority-matrix',
  templateUrl: './priority-matrix.component.html',
  styleUrls: ['./priority-matrix.component.css']
})
export class PriorityMatrixComponent implements OnInit {

  data!: Array<any>;
  project: string = "";

  constructor() { 
    this.data = [
      { description: 'Duplo_2x2_red', connections: ["Duplo_4x2"], Pic: "../../assets/images/pic_assembly/Parts_2.png"},
      { description: 'Duplo_2x2_green', connections: ["Duplo_8x2", "Duplo_4x2"], Pic: "../../assets/images/pic_assembly/Parts_1.png"},
      { description: 'Duplo_2x2_blue', connections: ["Duplo_8x2"], Pic: "../../assets/images/pic_assembly/Parts_2.png"},
      { description: 'Duplo_4x2', connections: ["Duplo_2x2_green", "Duplo_8x2", "Duplo_2x2_red"], Pic: "../../assets/images/pic_assembly/Parts_3.png"},
      { description: 'Duplo_8x2', connections: ["Duplo_2x2_blue", "Duplo_2x2_green", "Duplo_4x2"], Pic: "../../assets/images/pic_assembly/Parts_0.png"}
  ]
  }

  ngOnInit(): void {
    this.project = environment.project;
  }

}
