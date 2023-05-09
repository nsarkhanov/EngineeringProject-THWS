import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vital_button',
  templateUrl: './vital_button.component.html',
  styleUrls: ['./vital_button.component.css']
})
export class ButtonComponent implements OnInit{
  @Input() text: string;
  @Input() color: string;

  @Output() btnClick = new EventEmitter();
  @Input() pathToPic: string;
  @Input() iconId : number;
  @Input() curIcon: number;
  constructor() {}

  ngOnInit(): void {}

  onClick() {
      this.btnClick.emit()
  }

}
