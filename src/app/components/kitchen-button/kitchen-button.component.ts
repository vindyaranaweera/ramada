import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-kitchen-button',
  templateUrl: './kitchen-button.component.html',
  styleUrls: ['./kitchen-button.component.css']
})
export class KitchenButtonComponent implements OnInit {

  @Input()
  bgColor:any

  @Input()
  roomNumber:any
  constructor() { }

  ngOnInit(): void {
  }

}
