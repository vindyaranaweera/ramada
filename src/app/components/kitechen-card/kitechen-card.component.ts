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

  widthChangeEnable=0;

  myInnerHeight:any
  myInnerWidth:any

  isChecked:any;

  cardHeight:any
  cardWidth:any


  @Output() resizeCardID = new EventEmitter<any>();

  span=8;

  constructor() { }

  ngOnInit(): void {
    this.getScreenHeght();
  }

  cardClick(){
   if( this.isChecked==="checked"){
     this.isChecked="";
   }else {
     this.isChecked="checked";
   }
   if(this.widthChangeEnable===1){
     this.widthChangeEnable=0;
   }else {
     this.widthChangeEnable=1;
     this.widthChangeEnable=1;
   }
    this.resizeCardID.emit(this.cardId);
    console.log(this.cardId);
  }

  getScreenHeght() {
    setInterval(() => {
      this.myInnerHeight = window.innerHeight;
      this.myInnerWidth=window.innerWidth;
      console.log("SCREEN HEIGHT: " + this.myInnerHeight);
      if(this.myInnerHeight<601){
        this.cardHeight='100%'
      }else if(this.myInnerHeight<1025) {
        this.cardHeight='60vh'
      }else{
        this.cardHeight='70vh'
      }
      if(this.myInnerWidth<1025&&this.myInnerHeight<1025){
        this.cardWidth='45vw';
        this.cardHeight='70vh'
      }else{
          this.cardWidth='46vw'
      }
    }, 1000);
  }
}
