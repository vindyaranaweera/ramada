import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {KitchenService} from "../Services/kitchen.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-kitchen2',
  templateUrl: './kitchen2.component.html',
  styleUrls: ['./kitchen2.component.css']
})
export class Kitchen2Component implements OnInit {
  orders: any = [
    {
      roomNo: '001',
      orderColor: '#3ba0e9',
      protein: 'Sausage',
      toast: 'Brown Bread',
      hashbrown: 'yes',
      eggAvailable: 0,
      eggStyle: 'N/A',
      title: 'Egg & Cheese Sandwich',
      time: '08.00'
    },
    {
      roomNo: '002',
      orderColor: '#ffcd00',
      protein: 'Bacon',
      toast: 'Brown Bread',
      hashbrown: 'yes',
      eggAvailable: 0,
      eggStyle: 'N/A',
      title: 'Pancake',
      time: '10.00'
    },
    {
      roomNo: '005',
      orderColor: '#92D050',
      protein: 'Extra Egg',
      toast: 'White Bread',
      hashbrown: 'yes',
      eggAvailable: 1,
      eggStyle: 'Scrambled',
      title: 'Egg',
      time: '08.00'
    },
    {
      roomNo: '003',
      orderColor: '#ff4da8',
      protein: 'Bacon',
      toast: 'Brown Bread',
      hashbrown: 'yes',
      eggAvailable: 0,
      eggStyle: 'N/A',
      title: 'French Toast',
      time: '10.00'
    },
    {
      roomNo: '004',
      orderColor: '#f4ff3e',
      protein: 'Sausage',
      toast: 'Brown Bread',
      hashbrown: 'yes',
      eggAvailable: 0,
      eggStyle: 'N/A',
      title: 'Cheese Omelette',
      time: '06.00'
    },
    {
      roomNo: '006',
      orderColor: '#3ba0e9',
      protein: 'Extra Egg',
      toast: 'White Bread',
      hashbrown: 'yes',
      eggAvailable: 0,
      eggStyle: 'N/A',
      title: 'Egg & Cheese Sandwich',
      time: '04.00'
    },
    {
      roomNo: '007',
      orderColor: '#ffcd00',
      protein: 'Bacon',
      toast: 'Brown Bread',
      hashbrown: 'yes',
      eggAvailable: 0,
      eggStyle: 'N/A',
      title: 'Pancake',
      time: '10.00'
    },
    {
      roomNo: '008',
      orderColor: '#92D050',
      protein: 'Sausage',
      toast: 'Brown Bread',
      hashbrown: 'yes',
      eggAvailable: 1,
      eggStyle: 'Over Easy',
      title: 'Egg',
      time: '07.00'
    },
    {
      roomNo: '009',
      orderColor: '#ff4da8',
      protein: 'Bacon',
      toast: 'White Bread',
      hashbrown: 'yes',
      eggAvailable: 0,
      eggStyle: 'N/A',
      title: 'French Toast',
      time: '10.00'
    },
    {
      roomNo: '010',
      orderColor: '#f4ff3e',
      protein: 'Sausage',
      toast: 'Brown Bread',
      hashbrown: 'yes',
      eggAvailable: 0,
      eggStyle: 'N/A',
      title: 'Cheese Omelette',
      time: '09.00'
    },
  ];

  routerNavigate: any
  selectedButton = 1;
  currentDate: any = this.datePipe.transform(new Date(), 'YYYY/MM/dd');
  allPreparedOrders: any = [];
  roomNumberList: any = [];
  orderId: any;
  selectedRoom: any
  //type 1 for not select any room and default view
  viewType = 1

  changeFilterRange = 1
  roomNumber:any='';

  pickupStatus = 1
  totalOfNotPickups=0;

  constructor(private datePipe: DatePipe, private router: Router, private kitchenService: KitchenService) {
    this.routerNavigate = router;
  }

  ngOnInit(): void {
    this.reFreshPage();
  }

  goBack() {
    this.router.navigate(['kitchen']);
  }

  reFreshPage() {
    this.pickupStatus = 1
    this.viewType = 1;
    this.selectedRoom = '';
    this.selectedButton = 1;
    this.getAllPreparedOrders(1);
    this.filterRoomNumbers();
    this.setTotalNotPickupOrders();
    this.roomNumber='';
  }

  setSelection(value: any) {
    this.changeFilterRange = 1;
    if (value === 1) {
      this.selectedButton = 1;
      this.pickupStatus = 1
      if (this.viewType === 1) {
        this.getAllPreparedOrders(1)
      }else{
        this.getOrdersByRoomNoAndRange(this.roomNumber,1)
      }
    } else if (value === 2) {
      this.selectedButton = 2;
      this.pickupStatus = 2
      if (this.viewType === 1) {
        this.getAllNotPickUpOrders(1)
      }else{
        this.getOrdersByRoomNoAndRangeAndStatus(this.roomNumber,1,3);
      }
    } else {
      this.selectedButton = 3;
      this.pickupStatus = 3
      if (this.viewType === 1) {
        this.getAllPickUpOrders(1)
      }else{
        this.getOrdersByRoomNoAndRangeAndStatus(this.roomNumber,1,4)
      }
    }
  }

  getAllPreparedOrders(searchRange: any) {
    this.kitchenService.getAllPreparedOrders(searchRange, this.currentDate,).subscribe(response => {
      console.log(response);
      this.allPreparedOrders = response;
    });
  }

  getAllNotPickUpOrders(searchRange: any) {
    this.kitchenService.getAllPreparedOrders(searchRange, this.currentDate,).subscribe(response => {
      let list: any = [];
      for (let i = 0; i < response.length; i++) {
        if (response[i].status === 3) {
          list.push({
            orderId: response[i].orderId,
            roomNo: response[i].roomNo,
            status: response[i].status
          });
        }
      }
      this.allPreparedOrders = list;
    });
  }

  getAllPickUpOrders(searchRange: any) {
    this.kitchenService.getAllPreparedOrders(searchRange, this.currentDate,).subscribe(response => {
      let list: any = [];
      for (let i = 0; i < response.length; i++) {
        if (response[i].status === 4) {
          list.push({
            orderId: response[i].orderId,
            roomNo: response[i].roomNo,
            status: response[i].status
          });
        }
      }
      this.allPreparedOrders = list;
    });
  }

  changeOrderStatus(status: any) {
    this.kitchenService.completeOrder(this.orderId, status).subscribe(response => {
      console.log(response);
      this.reFreshPage();
    });
  }

  changeSelectedRoom(roomNo: any) {
    this.selectedButton=1;
    this.roomNumber=roomNo;
    this.viewType = 2;
    this.selectedRoom = roomNo;
    this.getOrdersByRoomNoAndRange(roomNo,1);
  }

  viewAll() {
    this.reFreshPage();
  }

  filterPickupsByRoomNumberRange(range: any) {
    this.changeFilterRange = range
    if (this.pickupStatus === 1) {
      this.getAllPreparedOrders(range);
    } else if (this.pickupStatus === 2) {
      this.getAllNotPickUpOrders(range);
    } else {
      this.getAllPickUpOrders(range);
    }
  }

  filterRoomNumbers() {
    let list: any = [];
    let roomList: any = [];
    this.kitchenService.getAllPreparedOrders(1, this.currentDate,).subscribe(response => {
      console.log(response);
      list = response;
      for (let i = 0; i < list.length; i++) {
        if (roomList.length > 0) {
          if (roomList.findIndex((x: any) => x.roomNo === list[i].roomNo) < 0) {
            roomList.push({roomNo: list[i].roomNo});
          }
        } else {
          roomList.push({
            roomNo: list[i].roomNo
          })
        }
      }
      console.log(roomList);
      this.roomNumberList = roomList;
    });
  }

  getOrdersByRoomNoAndRange(roomNo: any, range: any) {
    this.kitchenService.getAllPreparedOrders(range, this.currentDate,).subscribe(response => {
      console.log(response);
      let orderList: any = [];
      for (let i = 0; i < response.length; i++) {
        if (response[i].roomNo === roomNo) {
          orderList.push({
            roomNo: response[i].roomNo,
            orderId:response[i].orderId,
            status:response[i].status
          });
        }
      }
      this.allPreparedOrders=orderList;
      console.log(this.allPreparedOrders);
    });
  }

  getOrdersByRoomNoAndRangeAndStatus(roomNo: any, range: any,status:any) {
    this.kitchenService.getAllPreparedOrders(range, this.currentDate,).subscribe(response => {
      console.log(response);
      let orderList: any = [];
      for (let i = 0; i < response.length; i++) {
        if (response[i].roomNo === roomNo && response[i].status===status) {
          orderList.push({
            roomNo: response[i].roomNo,
            orderId:response[i].orderId,
            status:response[i].status
          });
        }
      }
      this.allPreparedOrders=orderList;
      console.log(this.allPreparedOrders);
    });
  }

  setTotalNotPickupOrders(){
    this.kitchenService.getTotalOfNotPickUpOrders(this.currentDate).subscribe(response=>{
      console.log(response);
      this.totalOfNotPickups=response;
    });
  }
}
