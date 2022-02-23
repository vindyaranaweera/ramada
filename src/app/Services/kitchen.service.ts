import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  private apiServerUrl='http://localhost:8080';

  constructor(private http:HttpClient) { }

  public getAllOrders(date:any):Observable<any>{
    let queryParams = new HttpParams().append("reqDate",date);
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/get_active_orders`,queryParams);
  }

  public getRoomNumber(bookingId:any){
    let queryParams = new HttpParams().append("id", bookingId);
    return this.http.post<any>(`${this.apiServerUrl}/api/booking_controller/get_roomno_by_bookingid`,queryParams);
  }

  public completeOrder(OrderId:any,status:any){
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/update_order_status?id=`+OrderId+`&status=`+status,'');
  }

  public getTotalOrderCountByDate(Date:any){
    let queryParams = new HttpParams().append("reqDate", Date);
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/order_count`,queryParams);
  }

  public getNotCompleteOrderCount(Date:any){
    let queryParams = new HttpParams().append("reqDate", Date);
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/get_active_order_count`,queryParams);
  }

  public  getRoomNumberList(date:any){
    let queryParams = new HttpParams().append("reqDate", date);
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/get_allactiveroomno_by_date`,queryParams);
  }

  public getFilteredOrdersByRoomNo(roomNo:any,date:any){
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/get_orders_by_roomno?reqDate=`+date+`&roomNo=`+roomNo,'');
  }

  public getAllPreparedOrders(range:any,date:any){
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/all_complete_orders?reqDate=`+date+`&i=`+range,'');
  }

  public getTotalOfNotPickUpOrders(date:any){
    let queryParams = new HttpParams().append("reqDate", date);
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/not_pickup_order_count`,queryParams);
  }
}
