import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {DatePipe} from "@angular/common";

interface cartItems {
  category: string;
  qty: number;
  protien: string;
  toast: string;
  hashbrown: string;
  eggstyle: string;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  currentTime: Date | null = new Date();
  right_now_enable = false;
  showSendtokitchen=1;
  suggestions: any;
  cart: cartItems[] = [];
  totalQuantity = 0;


  buttonText = "Send To Kitchen";

  @Input()
  cartItem:any;

  @Input()
  isVisible: boolean = false;

  @Input()
  isPreview:any;

  @Output()setCartVisibility=new EventEmitter<boolean>();


  constructor(private modal: NzModalService,public datepipe: DatePipe) { }

  ngOnInit(): void {

    if (new Date().getHours() > 3 && new Date().getHours() < 9) {
      this.right_now_enable = true;
    }
  }

  deleteQty(i:any) {
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
    this.currentTime = new Date();
  }

  sendToKitchen() {
    this.isVisible = false;
    this.setCartVisibility.emit(this.isVisible);
  }

  handleCancel(): void {
    this.isVisible =false;
    this.setCartVisibility.emit(this.isVisible);
    // if(this.showDelete===0){
    //   this.showDelete=1;
    // }

  }

  private updateTotalQty() {
    this.totalQuantity = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.totalQuantity = (this.totalQuantity + this.cart[i].qty);
    }

  }
}
