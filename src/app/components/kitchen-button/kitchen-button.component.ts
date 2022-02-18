import {Component, Input, OnInit} from '@angular/core';
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

  constructor(private kitchenService:KitchenService) { }


  ngOnInit(): void {
    this.getRoomNumber();
  }
  getRoomNumber(){
    this.kitchenService.getRoomNumber(this.bookingId).subscribe(response=>{
      console.log(response);
      this.roomNumber=response.message
    });
  }
}
