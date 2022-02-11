import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FrontOfficeService} from "../../Services/front-office.service";
import {AddGuestComponent} from "../../models/add-guest/add-guest.component";

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css'],
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
  @Output() setRoomNo = new EventEmitter<any>();


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
      this.setRoomNo.emit(this.number);
    // this.messageEvent.emit(number.toString());
  }
}
