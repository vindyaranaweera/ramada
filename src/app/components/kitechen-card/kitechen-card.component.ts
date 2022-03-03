import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KitchenService} from "../../Services/kitchen.service";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-kitechen-card',
  templateUrl: './kitechen-card.component.html',
  styleUrls: ['./kitechen-card.component.css']
})
export class KitechenCardComponent implements OnInit {

  @Input()
  status:any;

  @Input()
  cardTitle: any;

  @Input()
  protien: any;

  @Input()
  toast: any;

  @Input()
  hashbrown: any;

  @Input()
  roomNo: any;

  @Input()
  time: any;

  @Input()
  eggAvailable: any = 0;

  @Input()
  eggStyle: any;

  @Input()
  bgColor: any;

  @Input()
  qty: any

  @Input()
  notes: any = ''

  @Input()
  cardId: any;

  @Input()
  bookingID: any;

  @Input()
  orderId: any;

  widthChangeEnable = 0;

  myInnerHeight: any
  myInnerWidth: any

  isChecked: any;

  cardHeight: any
  cardWidth: any
  rFresh=false;

  @Output()reFreshPage=new EventEmitter<any>();
  @Output() resizeCardID = new EventEmitter<any>();

  span = 8;

  constructor(private modal: NzModalService, private kitchenService: KitchenService) {


  }

  ngOnInit(): void {
    setInterval(()=>{
      if(this.rFresh===true){
        this.reFreshPage.emit(true);
        this.rFresh=false;
      }
    });
    this.getScreenHeght();
    this.getRoomNumber();
  }

  cardClick() {
    if (this.isChecked === "checked") {
      this.isChecked = "";
    } else {
      this.isChecked = "checked";
    }
    if (this.widthChangeEnable === 1) {
      this.widthChangeEnable = 0;
    } else {
      this.widthChangeEnable = 1;
      this.widthChangeEnable = 1;
    }
    this.resizeCardID.emit(this.cardId);
    console.log(this.cardId);
  }

  getScreenHeght() {
    setInterval(() => {
      this.myInnerHeight = window.innerHeight;
      this.myInnerWidth = window.innerWidth;
      // console.log("SCREEN HEIGHT: " + this.myInnerHeight);
      if (this.myInnerHeight < 601) {
        this.cardHeight = '100%'
      } else if (this.myInnerHeight < 1025) {
        this.cardHeight = '60vh'
      } else {
        this.cardHeight = '70vh'
      }
      if (this.myInnerWidth < 1025 && this.myInnerHeight < 1025) {
        this.cardWidth = '45vw';
        this.cardHeight = '70vh'
      } else {
        this.cardWidth = '46vw'
      }
    }, 1000);
  }

  getRoomNumber() {
    this.kitchenService.getRoomNumber(this.bookingID).subscribe(response => {
      // console.log(response);
      this.roomNo = response.message
    });
  }

  startPreparing(){
    this.modal.confirm({
      nzTitle: '<i>Start Order</i>',
      nzContent: '<b><p>Are You Sure Want To Start This Order</p></b>',
      nzOnOk: () => this.setOrderStatus(2)
    });
  }

  completeOrder() {
    this.modal.confirm({
      nzTitle: '<i>Complete Order</i>',
      nzContent: '<b><p>Are You Sure Want To Complete This Order</p></b>',
      nzOnOk: () => this.setOrderStatus(4)
    });
  }

  setOrderStatus(status:any) {
    this.kitchenService.completeOrder(this.orderId, status).subscribe(response => {
      console.log(response);
      this.rFresh=true;
    });
  }
}
