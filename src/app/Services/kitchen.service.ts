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
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/sort_order_by_date_andtime`,queryParams);
  }

  public getRoomNumber(bookingId:any){
    let queryParams = new HttpParams().append("id", bookingId);
    return this.http.post<any>(`${this.apiServerUrl}/api/booking_controller/get_roomno_by_bookingid`,queryParams);
  }

  public completeOrder(OrderId:any,status:any){
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/update_order_status?id=`+OrderId+`&status=`+status,'');
  }
}
