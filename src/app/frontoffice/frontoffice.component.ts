import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FrontOfficeService} from "../Services/front-office.service";
import {DatePipe} from "@angular/common";
import {KitchenService} from "../Services/kitchen.service";

@Component({
  selector: 'app-frontoffice',
  templateUrl: './frontoffice.component.html',
  styleUrls: ['./frontoffice.component.css']
})


export class FrontofficeComponent implements OnInit {
  todayDate: Date = new Date();
  room = 1;
  Rooms: any = [];
  isVisible: boolean = false;
  suggestions: any;
  buttonText = "ADD";
  rout: any;

  span2: any;
  span4: any;
  span5: any;
  span: any;

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
  myInnerWidth: any;
  dateFormat: any;
  demoValue: any;

  totalPacks = 0;
  checkoutcount=0;
  totalOrders = 0;
  whatDate = 'To Day';
 tobeCheckout=0;
  constructor(private router: Router, private frontOfficeService: FrontOfficeService, public datepipe: DatePipe, private kitchenService: KitchenService) {
    this.rout = router;
    setInterval(() => {
      this.todayDate = new Date();
      this.findTotalPacks();
      this.getOrderCount();
    }, 1000);
  }

  ngOnInit(): void {
    this.getScreenWidth();
    this.findTotalPacks();
    this.getOrderCount();
    this.getcheckoutcount();
  }

  findTotalPacks() {
    this.frontOfficeService.getAllPacks().subscribe(response => {
      this.totalPacks = response;
    });
  }

  getcheckoutcount(){
    let date = this.datepipe.transform(new Date(), 'yyyy/MM/dd','MST+1');
    this.frontOfficeService.getCheckoutCount(date).subscribe(res=>{
      this.tobeCheckout=res;
    });
  }

  getOrderCount() {
    // code
    let date = this.datepipe.transform(new Date(), 'yyyy/MM/dd','MST+1');
    if (this.todayDate.getHours() > 8) {
      date = this.datepipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy/MM/dd');
      this.whatDate = 'Tomorrow';
    }
    this.kitchenService.getOrderCountByDate(date).subscribe(res => {
      this.totalOrders = res;
    });
  }

  changeScreen(number: number) {
    this.room = number;
  }

  add() {
    this.isVisible = false;
  }

  showRoom($event: string) {
    alert('show room ' + $event);
  }

  private getScreenWidth() {
    setInterval(() => {
      this.myInnerWidth = window.innerWidth;
      // console.log("SCREEN : " + this.myInnerWidth);
      if (this.myInnerWidth < 821) {
        this.span = 12;
      }
      if (this.myInnerWidth < 600 || (719 < this.myInnerWidth && this.myInnerWidth < 1025)) {
        this.span2 = 18;
        // this.span3=6;
        this.span4 = 1;
        this.span5 = 22;
      }
    }, 1000);
  }

  handleCancel() {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  handleOk() {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  showModal() {
    this.isVisible = true;
  }

  logOut() {
    this.rout.navigate([''])
  }
}
