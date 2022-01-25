import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-kitechen-card',
  templateUrl: './kitechen-card.component.html',
  styleUrls: ['./kitechen-card.component.css']
})
export class KitechenCardComponent implements OnInit {

  @Input()
  cardTitle:any;

  @Input()
  protien:any;

  @Input()
  toast:any;

  @Input()
  hashbrown:any;

  @Input()
  roomNo:any;

  @Input()
  time:any;

  @Input()
  eggAvailable:any=0;

  @Input()
  eggStyle:any;

  @Input()
  bgColor:any;

  @Input()
  cardId:any;

  isChecked:any;


  @Output() resizeCardID = new EventEmitter<any>();

  span=8;

  constructor() { }

  ngOnInit(): void {
  }

  cardClick(){
   if( this.isChecked==="checked"){
     this.isChecked="";
   }else {
     this.isChecked="checked";
   }
    this.resizeCardID.emit(this.cardId);
    console.log(this.cardId);
  }
}
