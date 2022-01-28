import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {

  @Input()
  cardType:any;
  @Input()
  number: any = 0;
  @Input()
  order_status: any = 0;
  @Input()
  isAvailable: boolean = true;
  @Input()
  orderColor:any;
  @Output() showPopup = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  showRoomDetails() {
      if(this.isAvailable){
        this.showPopup.emit(1);
      }else {
        this.showPopup.emit(0);
      }
    // this.messageEvent.emit(number.toString());
  }
}
