import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KitchenService} from "../../Services/kitchen.service";

@Component({
  selector: 'app-kitchen-button',
  templateUrl: './kitchen-button.component.html',
  styleUrls: ['./kitchen-button.component.css']
})
export class KitchenButtonComponent implements OnInit {

  @Input()
  bgColor:any;

  @Input()
  roomNumber:any;

  @Input()
  textcolor="white";

  @Input()
  bookingId:any;

  @Input()
  buttonType:any

  activeValue:any;

//----------------
  @Input()
  isSelected:any

  @Output()filterOrdersByRoomNo= new EventEmitter<any>();

  constructor(private kitchenService:KitchenService) { }


  ngOnInit(): void {
  }

  ButtonClicked(){
    if(this.buttonType===1){
      this.filterOrdersByRoomNo.emit(this.roomNumber);
      this.activeValue=this.roomNumber
    }
  }
}
