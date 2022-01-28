import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
  }
}
