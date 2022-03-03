import {Component, OnInit} from '@angular/core';
import {FrontOfficeService} from "../../Services/front-office.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  pancake: any;
  EggAndCheeseSandwich: any;
  CheeseOmelette: any;
  FrenchToast: any;
  Eggs: any;
  canceled: any = 0;
  total: any;
  date: Date = new Date();
  OrderList: any = [
    {roomNo: "101", orderColor: '#3ba0e9'},
    {roomNo: "102", orderColor: '#ffcd00'},
    {roomNo: "103", orderColor: '#ff4da8'},
    {roomNo: "104", orderColor: '#f4ff3e'},
    {roomNo: "105", orderColor: '#92D050'},
    {roomNo: "106", orderColor: '#3ba0e9'},
    {roomNo: "107", orderColor: '#ffcd00'},
    {roomNo: "108", orderColor: '#ff4da8'},
    {roomNo: "110", orderColor: '#f4ff3e'},
    {roomNo: "111", orderColor: '#3ba0e9'},
    {roomNo: "112", orderColor: '#ffcd00'},
    {roomNo: "113", orderColor: '#ff4da8'},
    {roomNo: "114", orderColor: '#f4ff3e'},
    {roomNo: "115", orderColor: '#92D050'},
    {roomNo: "116", orderColor: '#3ba0e9'},
    {roomNo: "117", orderColor: '#ffcd00'},
    {roomNo: "118", orderColor: '#ff4da8'},
    {roomNo: "119", orderColor: '#f4ff3e'},
    {roomNo: "120", orderColor: '#92D050'},
    {roomNo: "121", orderColor: '#ffcd00'},
    {roomNo: "122", orderColor: '#ff4da8'},
    {roomNo: "123", orderColor: '#f4ff3e'},
    {roomNo: "124", orderColor: '#92D050'},
    {roomNo: "125", orderColor: '#3ba0e9'},
    {roomNo: "126", orderColor: '#ffcd00'},
    {roomNo: "127", orderColor: '#ff4da8'},
    {roomNo: "128", orderColor: '#f4ff3e'},
    {roomNo: "129", orderColor: '#3ba0e9'},
    {roomNo: "130", orderColor: '#ffcd00'},
    {roomNo: "131", orderColor: '#ff4da8'},
    {roomNo: "132", orderColor: '#f4ff3e'},
    {roomNo: "133", orderColor: '#92D050'},
    {roomNo: "134", orderColor: '#3ba0e9'},
    {roomNo: "135", orderColor: '#ffcd00'},
    {roomNo: "136", orderColor: '#ff4da8'},
    {roomNo: "137", orderColor: '#f4ff3e'},
    {roomNo: "138", orderColor: '#92D050'},
    {roomNo: "139", orderColor: '#3ba0e9'},
    {roomNo: "140", orderColor: '#f4ff3e'},
    {roomNo: "141", orderColor: '#3ba0e9'},
    {roomNo: "142", orderColor: '#ffcd00'},
    {roomNo: "143", orderColor: '#ff4da8'},
    {roomNo: "144", orderColor: '#f4ff3e'},
    {roomNo: "145", orderColor: '#92D050'},
    {roomNo: "146", orderColor: '#3ba0e9'},
    {roomNo: "147", orderColor: '#ffcd00'},
    {roomNo: "148", orderColor: '#ff4da8'},
    {roomNo: "149", orderColor: '#f4ff3e'},
    {roomNo: "150", orderColor: '#3ba0e9'},
    {roomNo: "150", orderColor: '#ffcd00'},
    {roomNo: "151", orderColor: '#ff4da8'},
    {roomNo: "152", orderColor: '#f4ff3e'},
    {roomNo: "153", orderColor: '#92D050'},
    {roomNo: "154", orderColor: '#3ba0e9'},
    {roomNo: "155", orderColor: '#ffcd00'},
    {roomNo: "156", orderColor: '#ff4da8'},
    {roomNo: "157", orderColor: '#f4ff3e'},
    {roomNo: "158", orderColor: '#92D050'},
    {roomNo: "159", orderColor: '#ffcd00'},
    {roomNo: "160", orderColor: '#ff4da8'},


  ]
  orders: any;
  visibleRoomCard = false;
  visibleType: any;
  orderVisibility: any

  constructor(private frontOfficeService: FrontOfficeService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.reFreshPage();
  }

  reFreshPage(){
    this.setOrderSummery(this.date);
  }

  setOrderSummery(date: any) {
    date = this.datePipe.transform(date, 'YYYY/MM/dd');
    console.log(date);
    this.frontOfficeService.getOrderDetails(date).subscribe(response => {
      console.log(response);
      this.total = response;
    });
    let categoryList = ['pancake', 'Egg %26 Cheese Sandwich', 'Cheese Omelette', 'Eggs', 'French Toast'];
    for (let i = 0; i < categoryList.length; i++) {
      this.frontOfficeService.getCategoryCount(date, categoryList[i]).subscribe(response => {
        if (categoryList[i] === 'pancake') {
          this.pancake = response;
        } else if (categoryList[i] === 'Egg %26 Cheese Sandwich') {
          this.EggAndCheeseSandwich = response;
        } else if (categoryList[i] === 'Cheese Omelette') {
          this.CheeseOmelette = response;
        } else if (categoryList[i] === 'Eggs') {
          this.Eggs = response;
        } else {
          this.FrenchToast = response;
          console.log(this.pancake)
          console.log(this.EggAndCheeseSandwich)
          console.log(this.CheeseOmelette)
          console.log(this.FrenchToast)
          console.log(this.Eggs)
        }
        this.frontOfficeService.getCanceledOrderCount(date).subscribe(response => {
          console.log(response);
          this.canceled = response;
        });
      });
    }

    this.frontOfficeService.getAllOrders(date).subscribe(response => {
      // console.log(response);
      this.orders = response;
      console.log(this.orders)
      this.visibleRoomCard = true;
    });
  }

  onChange(result: Date): void {
    this.setOrderSummery(result);
  }

  afterOrderChange(status:any){
    if(status){
      this.reFreshPage();
    }
  }
}

