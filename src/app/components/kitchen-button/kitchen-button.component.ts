import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KitchenService} from "../../Services/kitchen.service";
import {NzModalService} from "ng-zorro-antd/modal";

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

  @Input()
  orderId:any;

  @Input()
  OrderStatus:any;

//----------------
  @Input()
  isSelected:any

  category:any;

  @Output()filterOrdersByRoomNo= new EventEmitter<any>();
  @Output()sendOrderId=new EventEmitter<any>();
  @Output()sendOrderStatus=new EventEmitter<any>();
  @Output()filterOrderPickUp=new EventEmitter<any>();

  constructor(private modal: NzModalService,private kitchenService:KitchenService) { }


  ngOnInit(): void {
    this.getOrderById();
  }

  ButtonClicked(){
    //type 1 === button use in kitchen 1 Ui
    //type 2=== button use in kitchen 2 UI all Orders
    //type 3=== button use in kitchen 2 UI for filter pickup orders
    if(this.buttonType===1){
      this.filterOrdersByRoomNo.emit(this.roomNumber);
      this.activeValue=this.roomNumber
    }else if (this.buttonType===2){
      this.setOrderPickupStatus();
    }else if(this.buttonType===3){

    }
  }

  setOrderPickupStatus(){
    if(this.OrderStatus===4){
      this.modal.confirm({
        nzTitle: '<i>Change Order Status</i>',
        nzContent: '<b><h2 style="color: #d21241">Are You Sure Want To Change This Order Status As Not PickUp</h2></b>',
        nzOnOk: () => this.setOrderStatus(3)
      });
    }else {
      this.modal.confirm({
        nzTitle: '<i>Change Order Status</i>',
        nzContent: '<b><h2 style="color: #15ff57">Are You Sure Want To Change This Order Status As PickUp</h2></b>',
        nzOnOk: () => this.setOrderStatus(4)
      });
    }
  }

  setOrderStatus(status:any){
    this.sendOrderId.emit(this.orderId);
    this.sendOrderStatus.emit(status);
  }

  getOrderById(){
    if(this.buttonType===2){
      this.kitchenService.getOrderCategoryById(this.orderId).subscribe(response=>{
        console.log(response);
        this.category=response.message;
      });
    }
  }
}
