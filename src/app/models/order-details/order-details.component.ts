import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FrontOfficeService} from "../../Services/front-office.service";
import {KitchenService} from "../../Services/kitchen.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  @Input()
  orderId:any;

  @Input()
  bookingId:any;

  @Input()
  orderdetails: any;

  @Input()
  item:any;

  @Input()
  room:any;

  @Input()
  orderStatus:any;

  @Output()hideModel=new EventEmitter<boolean>();
  @Output()refreshOrderPage=new EventEmitter<boolean>();
  cardTitle: any;
  eggStyle: any;
  protien: any;
  toast: any;
  hashbrown: any;
  roomNo: any;
  time: any;
  qty: any;
  notes: any;


  constructor( private message: NzMessageService, private modal: NzModalService,private frontOfficeService:FrontOfficeService,private kitchenService:KitchenService) { }
  ngOnInit(): void {
    // this.getOrderById();
   this.refreshPage();
  }

  refreshPage(){
    this.getOrdersByBookingId();
    console.log(this.item)
  }

  getOrderById(){
    this.frontOfficeService.getOrderById(this.orderId).subscribe(response=>{
      console.log(response);
    })
  }

  getFilteredOrdersByRoomNo(){

  }

  getOrdersByBookingId(){
    this.frontOfficeService.getOrdersByBookingId(this.bookingId).subscribe(response=>{
      console.log(response);
    });
  }

  showModal() {
    this.orderdetails = true;
  }

  handleCancel() {
    this.refreshOrderPage.emit(true);
    this.hideModel.emit(false);
    console.log('Button cancel clicked!');
    this.orderdetails = false;
  }

  handleOk() {
    this.refreshOrderPage.emit(true);
    this.hideModel.emit(false);
    console.log('Button ok clicked!');
    this.orderdetails = false;
  }

  clickVoidOrCancel(status:any){
    if(status===6){
      this.modal.confirm({
        nzTitle: '<i>Void Order</i>',
        nzContent: '<b><p>Are You Sure You Want To Void This Order</p></b>',
        nzOnOk: () => this.setOrderStatus(status)
      });
    }else{
      this.modal.confirm({
        nzTitle: '<i>Cancel Order</i>',
        nzContent: '<b><p>Are You Sure You Want To Cancel This Order</p></b>',
        nzOnOk: () => this.setOrderStatus(status)
      });
    }

  }

  setOrderStatus(status:any) {
    this.frontOfficeService.changeOrderStatus(this.orderId, status).subscribe(response => {
      console.log(response);
      if(response.status===true){
        this.createMessage('success',response.message);
        this.refreshPage();
      }else {
        this.createMessage('error',response.message);
      }
    });
  }

  createMessage(type: string, message: string): void {
    // message types
    // 'success'
    // 'error'
    // 'warning'
    this.message.create(type, message);
  }

}
