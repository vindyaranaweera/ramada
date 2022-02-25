import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {DatePipe} from "@angular/common";
import {GuestService} from "../../Services/guest.service";
import {differenceInCalendarDays} from "date-fns";
import {NzMessageService} from "ng-zorro-antd/message";

interface cartItems {
  category: string;
  qty: number;
  protien: string;
  toast: string;
  hashbrown: string;
  egg_style: string;
  note: string;
}

interface placeOrder {
  id: number;
  req_date: string;
  req_time: string;
  date: string;
  time: string;
  status: number;
  booking: number;
  detailsPayload: any;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [DatePipe]
})
export class CartComponent implements OnInit {

  dateFormat = 'yyyy/MM/dd'
  currentTime: Date | null = new Date();
  right_now_enable = false;
  showSendtokitchen = 1;
  suggestions: any;
  cart: cartItems[] = [];
  totalQuantity = 0;

  note:any| string = "";
  qty:any = 1;
  calenderDisableDate: Date = new Date();
  timePickerTime: Date|null = null;
  date: any = new Date();
  isEnglish = false;

  Date:any=this.datepipe.transform(new Date(), 'yyyy/MM/dd');
  Time:any=this.datepipe.transform(new Date(), 'HH:MM');
  orderId=0;
  orderDetailsId=0;

  buttonText = "Send To Kitchen";

  @Input()
  cartItem: any;

  @Input()
  isVisible: boolean = false;

  @Input()
  isPreview: any;
  @Input()
  bookingId: any;

  @Input()
  OtherDetails:any;

  @Input()
  totalRemainingOrders:any;



  @Output() setCartVisibility = new EventEmitter<boolean>();
  @Output() refreshSetTotalOrders=new EventEmitter();

  emitValue = false;

  constructor(private modal: NzModalService, public datepipe: DatePipe, private guestService: GuestService,private message: NzMessageService) {
  }

  ngOnInit(): void {
    if (new Date().getHours() > 3 && new Date().getHours() < 9) {
      this.right_now_enable = true;
    } else {
      this.right_now_enable = false;
    }
    if (this.right_now_enable === false) {
      this.date = null;
    }
    if(this.OtherDetails!=null){
      console.log('sdhfoihsadoifsdoifposdjfposdgp')
     this.setValues();
    }
  }

  disabledCurrentDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.calenderDisableDate) <= 0;

  disabledBeforeDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.calenderDisableDate) < 0;

  setValues(){
    for (let i=0;i<this.OtherDetails.length;i++){
      this.orderId=this.OtherDetails[i].id
      console.log(this.orderId)
      this.qty=this.OtherDetails[i].qty
      this.bookingId=this.OtherDetails[i].bookingId
      this.timePickerTime=new Date(this.OtherDetails[i].date +' '+this.OtherDetails[i].time)
      this.date=this.OtherDetails[i].date
      this.note=this.OtherDetails[i].note
      this.Time=this.OtherDetails[i].placedTime
      this.Date=this.OtherDetails[i].PlacedDate
      this.orderDetailsId=this.OtherDetails[i].orderDetailsId
    }
  }

  deleteQty(i: any) {
    let index = this.cartItem.indexOf(i);
    this.modal.confirm({
      nzTitle: '<i>Your Item Has Been Removed!</i>',
      nzContent: i.category + '<b> Will be Remove from your Cart!</b>',
      nzOnOk: () => {
        this.cartItem.splice(index, 1);
        this.updateTotalQty();
      },
      nzOnCancel: () => {

      }
    });
  }

  disabledHours(): number[] {
    return [0, 1, 2, 3, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,];
  }

  disabledMinutes(hour: number): number[] {
    if (hour === 4) {
      return [20, 21, 22, 23, 24, 25,];
    } else {
      return [];
    }
  }

  setCurrentTime() {
    this.timePickerTime = new Date();
  }

  sendToKitchen() {
    if (this.date !== null && this.timePickerTime !== null) {
      if (this.datepipe.transform(this.date, 'yyyy/MM/dd') != this.datepipe.transform(this.calenderDisableDate, 'yyyy/MM/dd')) {
        this.modal.confirm({
          nzTitle: '<i>Confirm Order</i>',
          nzContent: '<b><p>Order placed for '+ this.datepipe.transform(this.timePickerTime, 'HH:mm') +' a.m' +' '+ this.datepipe.transform(this.date, 'yyyy/MM/dd')+' </p></b>',
          nzOnOk: () => this.placeOrder()
        });
      } else {
        this.modal.confirm({
          nzTitle: '<i>Confirm Order</i>',
          nzContent: '<b><p>Order placed for '+ this.datepipe.transform(this.timePickerTime, 'HH:mm') +' a.m' +' '+ this.datepipe.transform(this.date, 'yyyy/MM/dd')+' </p></b>',
          nzOnOk: () => this.placeOrder()
        });
      }
    } else {
      if(this.date===null) {
        console.log(this.date);
        this.createMessage('error',"Please Select Wanted Date Before Place Order");
      }else if(this.timePickerTime===null){
        console.log(this.timePickerTime)
        this.createMessage('error',"Please Select Wanted Time Before Place Order");
      }
    }
  }

  placeOrder() {
    let currentDate: any = this.Date
    let currentTime: any = this.Time
    let RequestedDate: any = this.datepipe.transform(this.date, 'yyyy/MM/dd');
    let RequestTime: any = this.datepipe.transform(this.timePickerTime, 'HH:MM');
    let status: any = 1;
    let bookingId: any = this.bookingId;
    let category: any;
    let protien: any;
    let toast: any;
    let hashbrown: any;
    let egg_style: any;
    for (let i = 0; i < this.cartItem.length; i++) {
      category = this.cartItem[i].category;
      protien = this.cartItem[i].protien;
      toast = this.cartItem[i].toast;
      hashbrown = this.cartItem[i].hashbrown;
      egg_style = this.cartItem[i].egg_style;
    }
    let cart = {
      id:this.orderDetailsId,
      category: category,
      protien: protien,
      toast: toast,
      hashbrown: hashbrown,
      egg_style: egg_style,
      qty: this.qty,
      note: this.note
    }
    let orderBody = {
      id: this.orderId,
      date: currentDate,
      time: currentTime,
      req_date: RequestedDate,
      req_time: RequestTime,
      status: status,
      booking: bookingId,
      detailsPayload: cart
    }
    console.log(orderBody);
    if(this.orderId===0){
      this.guestService.placeOrder(orderBody).subscribe(response => {
        console.log(response);
        if(response.status===true){
          this.createMessage('success',response.message);
        }else {
          this.createMessage('error',response.message);
        }
      });
    }else{
      this.guestService.updateOrder(orderBody).subscribe(response=>{
        if(response.status===true){
          this.createMessage('success',response.message);
        }else {
          this.createMessage('error',response.message);
        }
      });
    }
    this.isVisible = false;
    this.setCartVisibility.emit(this.isVisible);
    this.resetVariables();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.setCartVisibility.emit(this.isVisible);
    this.resetVariables();
  }

  private updateTotalQty() {
    this.totalQuantity = 0;

  }

  addCount(): void {
    if(this.qty<this.totalRemainingOrders){
      this.qty++;
    }
  }

  minCount(): void {
    this.qty--;
    if (this.qty < 1) {
      this.qty = 1;
    }
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  resetVariables() {
    this.qty = 1;
    this.cartItem.splice(0);
    this.date = null;
    this.timePickerTime = null;
    this.note="";
    this.orderId=0;
  }

  createMessage(type: string,message:string): void {
    // message types
    // 'success'
    // 'error'
    // 'warning'
    this.message.create(type, message);
  }
}
