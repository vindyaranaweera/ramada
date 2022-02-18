import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {delay} from "rxjs";
import {KitchenService} from "../Services/kitchen.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

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
  order:any=[];

  span: any = 8;
  span2: any = 20;
  span3: any = 4;
  span4: any = 2;
  span5: any = 20;
  myInnerWidth: any;

  cardId: any;
  oldCardId: string = "";

  @ViewChild('new') private mainDiv: ElementRef;


  constructor(private datePipe:DatePipe, private router: Router, mainDiv:ElementRef,private kitchenService:KitchenService) {
    this.mainDiv=mainDiv
  }

  goToPage(link: String): void {
    this.router.navigate([`${link}`])
  }

  ngOnInit(): void {
    // console.log(this.oldCardId);
    // console.log(this.cardId);
    this.getScreenWidth();
    // console.log(window.innerHeight);
    this.setOrders();
  }

  getScreenWidth() {
    setInterval(() => {
      this.myInnerWidth = window.innerWidth;
      // console.log("SCREEN : " + this.myInnerWidth);
      if (this.myInnerWidth < 821) {
        this.span = 12;
      }
      if (this.myInnerWidth < 600 || (719 < this.myInnerWidth && this.myInnerWidth < 1025)) {
        this.span2 = 18;
        this.span3 = 6;
        this.span4 = 1;
        this.span5 = 22;
      }
    }, 1000);
  }

  setCardSize(crdId: any) {
    let elem: any;
    let elemID = crdId.toString();
    let oldElem: any;

    elem = document.getElementById(elemID);
    if (this.oldCardId === "" || this.oldCardId === elemID) {
      if (elem.getAttribute('class') === 'gutter-row ant-col ant-col-16' ||elem.getAttribute('class') === 'gutter-row ant-col ant-col-24') {
        if (this.myInnerWidth < 821) {
          elem.setAttribute('class', 'gutter-row ant-col ant-col-12');
        } else {
          elem.setAttribute('class', 'gutter-row ant-col ant-col-8')
        }
        this.oldCardId = elemID;
      } else {
        if (this.myInnerWidth < 821) {
          elem.setAttribute('class', 'gutter-row ant-col ant-col-24');
        } else {
          elem.setAttribute('class', 'gutter-row ant-col ant-col-16');
        }
        this.oldCardId = elemID;
      }
    } else {
      if (this.myInnerWidth < 821) {
        if (elem.getAttribute('class') === 'gutter-row ant-col ant-col-24') {
          elem.setAttribute('class', 'gutter-row ant-col ant-col-12')
          this.oldCardId = elemID;
        } else {
          elem.setAttribute('class', 'gutter-row ant-col ant-col-24');
          this.oldCardId = elemID;
        }
      } else {
        if (elem.getAttribute('class') === 'gutter-row ant-col ant-col-16') {
          elem.setAttribute('class', 'gutter-row ant-col ant-col-8')
          this.oldCardId = elemID;
        } else {
          elem.setAttribute('class', 'gutter-row ant-col ant-col-16');
          this.oldCardId = elemID;
        }

      }
    }


    // this.mainDiv.nativeElement.scroll({
    //   top: this.mainDiv.nativeElement.scrollHeight,
    //   left: 0,
    //   behavior: 'smooth'
    // });

  }

  setOrders(){
    let date=this.datePipe.transform(new Date(),'YYYY/MM/dd');
    this.kitchenService.getAllOrders(date).subscribe(response=>{
      console.log(response);
      this.order=response;
    });
  }

  refreshPage(value:boolean){
    if(value===true){
      this.setOrders();
    }
  }
}
