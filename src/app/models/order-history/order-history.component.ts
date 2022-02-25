import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {GuestService} from "../../Services/guest.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  @Output()resetVisibility=new EventEmitter<boolean>();
  @Output()sendOrderDetails=new EventEmitter<any>()
  @Output()sendOtherDetails=new EventEmitter<any>()

  @Input()
  isVisible: boolean = false;
  @Input()
  bookingId:any;

  isVisible2 = false;
  editOrderList:any;
  otherDetailsList:any[]=[{}];

  constructor(private guestService:GuestService,private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.getOrderHistory(this.bookingId);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetVisibility.emit(false);
  }

  getOrderHistory(bookingId:number){
    this.guestService.getOrderHistory(bookingId).subscribe(response=>{
      console.log(response);
      this.editOrderList=response;
    });
  }

  showOrder(list:any){
    console.log(this.otherDetailsList)
    this.sendOtherDetails.emit(this.otherDetailsList);
    this.sendOrderDetails.emit(list);
    this.isVisible=false;
    this.resetVisibility.emit(false);
  }

  rFreshOrderHistory(orderId:any){
      this.guestService.cancelOrder(orderId).subscribe(response => {
        console.log(response);
        if (response.status === true) {
          this.createMessage('success',response.message);
          this.getOrderHistory(this.bookingId);
        }else {
          this.createMessage('error',response.message);
        }
      });
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }
}
