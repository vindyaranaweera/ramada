import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FrontOfficeService} from "../../Services/front-office.service";
import {AddGuestComponent} from "../../models/add-guest/add-guest.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css'],
})
export class RoomCardComponent implements OnInit {

  @Input()
  orderId: any;

  @Input()
  cardType: any;
  @Input()
  number: any = 0;
  @Input()
  order_status: any = 0;
  @Input()
  isAvailable: boolean = true;
  @Input()
  orderColor: string | any;
  @Input()
  bookingId: any;
  @Input()
  orderStatus: any;
  @Input()
  orderQty: any;

  showDetailsCom = false;

  @Input()
  itemDetails: any;

  @Input() setRoomOrderNumber(value: any) {
    console.log("dshfihaifdofjas")
  }

  @Output() showPopup = new EventEmitter<number>();
  @Output() setRoomNo = new EventEmitter<any>();
  @Output() refreshOrder = new EventEmitter<any>();

  needToCheckout = false;

  constructor(private frontOfficeService: FrontOfficeService, public datepipe: DatePipe) {
  }

  ngOnInit(): void {
    if (this.bookingId != null) {
      this.number = this.bookingId;
      this.getRoomNumber();
    } else {
      this.getBookingInfo();
    }
  }

  showRoomDetails() {
    if (this.isAvailable) {
      this.showPopup.emit(1);
    } else {
      this.showPopup.emit(0);
    }
    this.setRoomNo.emit(this.number);
    // this.messageEvent.emit(number.toString());
  }

  test() {

  }

  showDetails() {
    this.showDetailsCom = true;
  }

  getRoomNumber() {
    this.frontOfficeService.getRoomNumber(this.bookingId).subscribe(response => {
      this.number = response.message
    });
  }

  reFreshOrderPage(status: any) {
    if (status) {
      this.refreshOrder.emit(true);
    }
  }

  private getBookingInfo() {
    this.frontOfficeService.viewBooking(this.number).subscribe(res => {
      if (res !== null && res !== undefined) {
        if (this.datepipe.transform(res.checkoutdate, 'yyyy-MM-dd') === this.datepipe.transform(new Date(), 'yyyy-MM-dd')) {
          this.needToCheckout = true;
        }
      }
    });
  }
}
