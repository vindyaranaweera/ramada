import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {GuestService} from "../../Services/guest.service";

@Component({
  selector: 'app-edite-order-card',
  templateUrl: './edite-order-card.component.html',
  styleUrls: ['./edite-order-card.component.css']
})
export class EditeOrderCardComponent implements OnInit {

  @Output() sendEditOrderDetails = new EventEmitter<any>()
  @Output() sendOtherDetails = new EventEmitter<any[]>();

  @Input()
  OrderId: any;

  @Input()
  category: any;

  @Input()
  protien: any

  @Input()
  toast: any

  @Input()
  hashbrown: any

  @Input()
  egg_style: any

  @Input()
  time: any

  @Input()
  date: any;

  @Input()
  bookingId: any;

  @Input()
  status: any

  @Input()
  qty: any;

  @Input()
  note: any;

  @Input()
  finishedAt: any;

  @Input()
  PlacedDate:any

  @Input()
  placedTime:any

  @Input()
  orderDetailsId:any

  @Input()
  guestName:any

  @Output()sendCancelOrder=new EventEmitter<any>()

  constructor(private message: NzMessageService, private modal: NzModalService, private guestService: GuestService) {
  }

  ngOnInit(): void {
  }


  deleteQty() {
    if (this.status === 0 || this.status === 1) {
      this.modal.confirm({
        nzTitle: '<i>Your Item Has Been Removed!</i>',
        nzContent: this.category + '<b> Will be Remove from your Cart!</b>',
        nzOnOk: () => this.cancelOrder(),
        nzOnCancel: () => {

        }
      });
    } else {
      this.createMessage('error', 'you can' + "'" + 't delete this order because this order ' + this.finishedAt)
    }
  }

  updateOrder() {
    if (this.status === 0 || this.status === 1) {
      let cartItem: any = [{
        category: this.category,
        protien: this.protien,
        toast: this.toast,
        hashbrown: this.hashbrown,
        egg_style: this.egg_style,
        time: this.time,
        date: this.date
      }];
      let OtherDetails:any=[{
        id:this.OrderId,
        time:this.time ,
        date:this.date,
        bookingId:this.bookingId,
        qty:this.qty,
        note:this.note,
        guestName:this.guestName,
        PlacedDate:this.PlacedDate,
        placedTime:this.placedTime,
        orderDetailsId:this.orderDetailsId
      }];
      console.log(OtherDetails)
      this.sendOtherDetails.emit(OtherDetails);
      this.sendEditOrderDetails.emit(cartItem);
    } else {
      this.createMessage('error', 'you can' + "'" + 't edit this order because this order ' + this.finishedAt)
    }
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  cancelOrder() {
    this.sendCancelOrder.emit(this.OrderId);
  }
}
