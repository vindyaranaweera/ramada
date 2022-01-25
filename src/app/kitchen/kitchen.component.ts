import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {delay} from "rxjs";

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

  span: any = 8;
  span2: any = 20;
  span3: any = 4;
  span4: any = 2;
  span5: any = 20;
  myInnerWidth: any;

  cardId: any;
  oldCardId: string = "";

  constructor(private router: Router) {
  }

  goToPage(link: String): void {
    this.router.navigate([`${link}`])
  }

  ngOnInit(): void {
    console.log(this.oldCardId);
    console.log(this.cardId);
    this.getScreenWidth();
  }

  getScreenWidth() {
    setInterval(() => {
      this.myInnerWidth = window.innerWidth;
      console.log("SCREEN : " + this.myInnerWidth);
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
    if (this.oldCardId != "" || this.oldCardId === elemID) {
      elem = document.getElementById(elemID);
      console.log("element 1st" + elem.getAttribute('class'));
      if (elem.getAttribute('class') === 'gutter-row ant-col ant-col-16') {
        elem.setAttribute('class', 'gutter-row ant-col ant-col-8');
        oldElem = document.getElementById(this.oldCardId);
        oldElem.setAttribute('class', 'gutter-row ant-col ant-col-8');
        console.log("old element 1:" + oldElem);
      } else {
        elem.setAttribute('class', 'gutter-row ant-col ant-col-16');
        oldElem = document.getElementById(this.oldCardId);
        if (this.oldCardId === elemID) {
          oldElem.setAttribute('class', 'gutter-row ant-col ant-col-8');
        } else {
          oldElem.setAttribute('class', 'gutter-row ant-col ant-col-8');
        }
        console.log("old element 2:" + oldElem);
      }
      this.oldCardId = elemID;
    } else {
      let elem: any;
      console.log("old element 3:" + oldElem);
      let elemID = crdId.toString();
      elem = document.getElementById(elemID);
      console.log('span is : ' + elem.getAttribute('class'));
      elem.setAttribute('class', 'gutter-row ant-col ant-col-16');
      this.oldCardId = elemID;
    }
  }
}
