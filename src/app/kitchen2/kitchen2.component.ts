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

  waitingOrders: any = [];

  kCard: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  routerNavigate: any
  selectedButton = 1;
  currentDate: any = this.datePipe.transform(new Date(), 'YYYY/MM/dd');
  allPreparedOrders: any = [];
  roomNumberList: any = [];
  orderId: any;
  selectedRoom: any
  //type 1 for not select any room and default view
  viewType = 1
  showWaitingOrder = 0;

  changeFilterRange = 1
  roomNumber: any = '';

  pickupStatus = 1
  totalOfNotPickups = 0;
  totalOrders: any;
  totalNotCompleteOrderCount: any;
  todayDate: Date = new Date();



  constructor(private datePipe: DatePipe, private router: Router, private kitchenService: KitchenService) {
    this.routerNavigate = router;
  }

  ngOnInit(): void {
    this.reFreshPage();
  }

  goBack() {
    this.router.navigate(['kitchen2']);
  }

  reFreshPage() {
    this.changeFilterRange=1;
    this.pickupStatus = 1
    this.viewType = 1;
    this.selectedRoom = '';
    this.selectedButton = 1;
    this.showWaitingOrder=0;
    // this.getAllPreparedOrders(1);
    // this.filterRoomNumbers();
    this.setTotalNotPickupOrders();
    this.roomNumber = '';
    this.setTotalOrderCount();
    this.setNoteCompleteOrderCount();
    this.setOrders()
    // this.setOrders2()
    this.setRoomNumberList();
    this.filterOrderByRoomNo(1);
    // this.setRoomNumberList2();
  }

  setSelection(value: any) {
    this.changeFilterRange = 1;
    if (value === 1) {
      this.showWaitingOrder = 0;
      this.selectedButton = 1;
      this.pickupStatus = 1
      if (this.viewType === 1) {
        this.getAllPreparedOrders(1)
        // this.getAllPreparedOrders2(1)
      } else {
        this.getOrdersByRoomNoAndRange(this.roomNumber, 1)
      }
    } else if (value === 2) {
      this.showWaitingOrder = 1;
      this.selectedButton = 2;
      this.pickupStatus = 2
      if (this.viewType === 1) {
        this.getAllNotPickUpOrders(1)
      } else {
        this.getOrdersByRoomNoAndRangeAndStatus(this.roomNumber, 1, 3);
      }
    } else if (value === 3) {
      this.showWaitingOrder = 1;
      this.selectedButton = 3;
      this.pickupStatus = 3
      if (this.viewType === 1) {
        this.getAllPickUpOrders(1)
      } else {
        this.getOrdersByRoomNoAndRangeAndStatus(this.roomNumber, 1, 4)
      }
    } else {
      this.showWaitingOrder = 0;
      this.selectedButton = 4;
      this.pickupStatus = 1
      if (this.viewType === 1) {
        this.getAllPreparedOrders(1)
        // this.getAllPreparedOrders2(1)
      } else {
        this.getOrdersByRoomNoAndRange(this.roomNumber, 1)
      }
    }
  }

  getAllPreparedOrders(searchRange: any) {
    this.kitchenService.getAllPreparedOrders(searchRange, this.currentDate,).subscribe(response => {
      // console.log(response);
      this.allPreparedOrders = response;
    });
  }

  getAllPreparedOrders2(searchRange: any) {
    this.kitchenService.getAllPreparedOrdersAllDays(searchRange).subscribe(response => {
      // console.log(response);
      this.allPreparedOrders = response;
    });
  }

  setRoomNumberList() {
    this.kitchenService.getAllPreparedOrders(1, this.currentDate,).subscribe(response => {
      // console.log('before3');
      // console.log(this.currentDate);
      // console.log(response);
      // console.log('after3');

      this.roomNumberList = response;
    });
  }

  setRoomNumberList2() {
    this.kitchenService.getAllPreparedOrdersAllDays(1).subscribe(response => {
      // console.log('before3');
      // console.log(this.currentDate);
      console.log(response);
      // console.log('after3');

      this.roomNumberList = response;
    });
  }

  getAllNotPickUpOrders(searchRange: any) {
    this.kitchenService.getAllPreparedOrders(searchRange,this.currentDate).subscribe(response => {
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
    this.kitchenService.getAllPreparedOrders(searchRange,this.currentDate).subscribe(response => {
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
      // console.log(response);
      this.reFreshPage();
    });
  }

  changeSelectedRoom(roomNo: any) {
    // this.selectedButton=1;
    // this.roomNumber=roomNo;
    // this.viewType = 2;
    // this.selectedRoom = roomNo;
    // this.getOrdersByRoomNoAndRange(roomNo,1);
  }

  viewAll() {
    this.reFreshPage();
  }

  setTotalOrderCount() {
    // this.kitchenService.getTotalOrderCountByDate(this.currentDate).subscribe(response => {
    //   this.totalOrders = response;
    // });
    this.kitchenService.getTotalOrderCountByDate(this.currentDate).subscribe(response => {
      // console.log(response);
      this.totalOrders = response;
    });
  }

  setNoteCompleteOrderCount() {
    this.kitchenService.getNotCompleteOrderCount(this.currentDate).subscribe(response => {
      // console.log('before2');
      // console.log(response);
      // console.log('after2');
      this.totalNotCompleteOrderCount = response;
    });
  }

  filterPickupsByRoomNumberRange(range: any) {
    this.changeFilterRange = range
    if (this.showWaitingOrder === 1) {
      if (this.pickupStatus === 1) {
        this.getAllPreparedOrders(range);
        // this.getAllPreparedOrders2(range);
      } else if (this.pickupStatus === 2) {
        this.getAllNotPickUpOrders(range);
      } else {
        this.getAllPickUpOrders(range);
      }
    } else {
      this.filterOrderByRoomNo(range);
    }
  }

  filterOrderByRoomNo(range: any) {
    let date = this.datePipe.transform(new Date(), 'YYYY/MM/dd');
    this.kitchenService.getAllOrders(this.currentDate).subscribe(response => {
      let list = response
      let newList: any = [];
      if (range === 100) {
        for (let i = 0; i < list.length; i++) {
          this.kitchenService.getRoomNumber(list[i].booking).subscribe(response => {
            let roomNo: number = parseInt(response.message);
            // console.log(roomNo);
            if (100 <= roomNo && roomNo < 200) {
              console.log(list[i].booking);
              let newDetailsPayload: any = {
                category: list[i].detailsPayload.category,
                egg_style: list[i].detailsPayload.egg_style,
                hashbrown: list[i].detailsPayload.hashbrown,
                id: list[i].detailsPayload.id,
                note: list[i].detailsPayload.note,
                protien: list[i].detailsPayload.protien,
                qty: list[i].detailsPayload.qty,
                toast: list[i].detailsPayload.toast
              }
              newList.push({
                booking: list[i].booking,
                date: list[i].date,
                finishedAt: list[i].finishedAt,
                id: list[i].id,
                req_date: list[i].req_date,
                req_time: list[i].req_time,
                status: list[i].status,
                time: list[i].time,
                guestName:list[i].guestName,
                detailsPayload: newDetailsPayload
              });
              console.log(list);
            }
          });
          // console.log("jeiuewrtuwerotuer")
          this.waitingOrders = newList;
          // console.log(this.waitingOrders);
        }
      } else if (range === 200) {
        for (let i = 0; i < list.length; i++) {
          this.kitchenService.getRoomNumber(list[i].booking).subscribe(response => {
            let roomNo: number = parseInt(response.message);
            if (roomNo >= 200 && roomNo < 300) {
              let newDetailsPayload: any = {
                category: list[i].detailsPayload.category,
                egg_style: list[i].detailsPayload.egg_style,
                hashbrown: list[i].detailsPayload.hashbrown,
                id: list[i].detailsPayload.id,
                note: list[i].detailsPayload.note,
                protien: list[i].detailsPayload.protien,
                qty: list[i].detailsPayload.qty,
                toast: list[i].detailsPayload.toast
              }
              // console.log(this.waitingOrders[i].booking)
              newList.push({
                booking: list[i].booking,
                date: list[i].date,
                finishedAt: list[i].finishedAt,
                id: list[i].id,
                req_date: list[i].req_date,
                req_time: list[i].req_time,
                status: list[i].status,
                time: list[i].time,
                guestName:list[i].guestName,
                detailsPayload: newDetailsPayload
              });
              // console.log("hsafoaosdfiu")
              // console.log(newDetailsPayload);
              // console.log('dsfpsdpfsdfospdfsdpof')
              // console.log(list);
            }
          });
        }
        this.waitingOrders = newList;
      } else {
        this.waitingOrders = response
      }
    });

  }

  filterRoomNumbers() {
    let list: any = [];
    let roomList: any = [];
    this.kitchenService.getAllPreparedOrders(1, this.currentDate,).subscribe(response => {
      // console.log(response);
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
      // console.log(roomList);
      this.roomNumberList = roomList;
    });
  }

  getOrdersByRoomNoAndRange(roomNo: any, range: any) {
    this.kitchenService.getAllPreparedOrders(range, this.currentDate,).subscribe(response => {
      // console.log(response);
      let orderList: any = [];
      for (let i = 0; i < response.length; i++) {
        if (response[i].roomNo === roomNo) {
          orderList.push({
            roomNo: response[i].roomNo,
            orderId: response[i].orderId,
            status: response[i].status
          });
        }
      }
      this.allPreparedOrders = orderList;
      // console.log(this.allPreparedOrders);
    });
  }

  getOrdersByRoomNoAndRangeAndStatus(roomNo: any, range: any, status: any) {
    this.kitchenService.getAllPreparedOrders(range, this.currentDate,).subscribe(response => {
      // console.log(response);
      let orderList: any = [];
      for (let i = 0; i < response.length; i++) {
        if (response[i].roomNo === roomNo && response[i].status === status) {
          orderList.push({
            roomNo: response[i].roomNo,
            orderId: response[i].orderId,
            status: response[i].status
          });
        }
      }
      this.allPreparedOrders = orderList;
      // console.log(this.allPreparedOrders);
    });
  }

  setTotalNotPickupOrders() {
    this.kitchenService.getTotalOfNotPickUpOrders(this.currentDate).subscribe(response => {
      // console.log(response);
      this.totalOfNotPickups = response;
    });
  }

  logOut() {
    this.router.navigate([''])
  }

  setOrders() {
    this.selectedRoom = '';
    let date = this.datePipe.transform(new Date(), 'YYYY/MM/dd');
    // console.log(date);
    this.kitchenService.getAllOrders(date).subscribe(response => {
      // console.log('before');
      console.log(response);
      // console.log('after');
      this.waitingOrders = response;
      // this for group orders
      // this.groupOrders();
    });
  }

  setOrders2() {
    this.selectedRoom = '';
    let date = this.datePipe.transform(new Date(), 'YYYY/MM/dd');
    // console.log(date);
    this.kitchenService.getAllActiveOrdersNew().subscribe(response => {
      // console.log('before');
      console.log(response);
      // console.log('after');
      this.waitingOrders = response;
      // this for group orders
      // this.groupOrders();
    });
  }

  getTimeList():any{
    let timeList = [];
    for (let hour = 4; hour < 9; hour++) {
      for (let min = 0; min <= 60; min = min + 15) {
        let setMin: any;
        let setHour: any = hour;
        if (min === 0) {
          setMin = "00";
        } else {
          if (min === 60) {
            setMin = "00";
            setHour++;
          } else {
            setMin = min.toString();
          }
        }
        let date2: any = this.datePipe.transform(this.datePipe.transform(new Date(), "YYYY/MM/dd") + " 0" + setHour + ":" + setMin, 'EEE MMM dd y h:mm:ss zzzz');
        timeList.push(date2);
        // console.log(date2);
      }
    }
    return timeList;
  }

  groupOrders() {
    let date: any;
    let timeList=this.getTimeList()
    for (let i=0;i<timeList.length;i++){
      let date: any = this.datePipe.transform(timeList[i], 'EEE MMM dd y h:mm:ss zzzz');
      let formatDate:any=(new Date(date.toString()));
      let val=this.checkTime(formatDate,15);
    }
    // console.log(date.toLocaleString('en-US',{houre:'numeric',hour12:false}));
  }

  checkTime(start:any,range: any): any {
    let date:any;
    let list:any=[];
    for(let i=0;i<this.waitingOrders.length;i++){
      date = this.datePipe.transform(this.waitingOrders[i].req_date + " "+this.waitingOrders[i].req_time, 'EEE MMM dd y h:mm:ss zzzz');
      date=new Date(date.toString());
      if (start.getHours() === date.getHours()) {
        if (start.getMinutes() + range > date.getMinutes()) {
          console.log(start);
          console.log(start.getMinutes() + range);
          console.log(date);
          list.push(this.waitingOrders[i])
        }
      }
    }
    console.log(list);
    return list;

  }


  AfterReFreshPage(value: boolean) {
    if (value === true) {
      this.reFreshPage();
      this.setOrders();
      this.setTotalOrderCount();
      this.setNoteCompleteOrderCount();
    }
  }
}
