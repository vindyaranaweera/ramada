import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

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
      time:'08.00'
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
      time:'10.00'
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
      time:'08.00'
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
      time:'10.00'
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
      time:'06.00'
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
      time:'04.00'
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
      time:'10.00'
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
      time:'07.00'
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
      time:'10.00'
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
      time:'09.00'
    },
  ];

  span:any=8;
  span2:any=20;
  span3:any=4;
  span4:any=2;
  span5:any=20;
  myInnerWidth:any;
  constructor(private router: Router) {
  }
  goToPage(link:String):void
  {
    this.router.navigate([`${link}`])
  }
  ngOnInit(): void {
    this.getScreenWidth();
  }

  getScreenWidth() {
    setInterval(() => {
      this.myInnerWidth = window.innerWidth;
      console.log("SCREEN : "+this.myInnerWidth);
      if (this.myInnerWidth<821){
        this.span=12;
      }
      if (this.myInnerWidth<600|| (719<this.myInnerWidth && this.myInnerWidth<1025)){
        this.span2=18;
        this.span3=6;
        this.span4=1;
        this.span5=22;
      }
    }, 1000);
  }
}
