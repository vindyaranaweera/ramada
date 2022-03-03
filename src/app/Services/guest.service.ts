import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  // private apiServerUrl='http://143.198.36.89/api';
  private apiServerUrl='http://localhost:8080';

  constructor(private http:HttpClient) { }

  public checkLogin(userId:any):Observable<any>{
    let queryParams = new HttpParams().append("key",userId);
    return this.http.get<any>(`${this.apiServerUrl}/api/User_controller/user_login/`,{params:queryParams});
  }

  public getBookingDetails(bookingID:any){
    let queryParams = new HttpParams().append("id",parseInt(bookingID));
    return this.http.post<any>(`${this.apiServerUrl}/api/booking_controller/get_booking_details`,queryParams);
  }

  public placeOrder(orderBody:any):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/addnew_order/`,orderBody);
  }

  public getAllFavourites(guestId:number){
    let queryParams = new HttpParams().append("id",guestId);
    return this.http.post<any>(`${this.apiServerUrl}/api/favourite_controller/get_favourite_list`,queryParams);
  }

  public addToFavourite(favouriteBody:any){
    return this.http.post<any>(`${this.apiServerUrl}/api/favourite_controller/create_favourite_item/`,favouriteBody);
  }

  public removeFavourite(id:number){
    let queryParams = new HttpParams().append("id",id);
    return this.http.post<any>(`${this.apiServerUrl}/api/favourite_controller/cancel_favourite`,queryParams);
  }

  public getOrderHistory(bookingId:number){
    let queryParams = new HttpParams().append("id",bookingId);
    return this.http.get<any>(`${this.apiServerUrl}/api/order_controller/get_order_historylist`,{params:queryParams});
  }

  public cancelOrder(orderId:number){
    let queryParams = new HttpParams().append("id",orderId);
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/cancel_order`,queryParams);
  }

  public updateOrder(orderBody:any){
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/update_order`,orderBody);
  }

  // public setRemainingOrderCount(bookingId:any){
  //   let queryParams = new HttpParams().append("id",bookingId);
  //   return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/cancel_order`,queryParams);
  // }

  public setTotalOrders(bookingId:number,date:any){
    let queryParams = new HttpParams().append("id",bookingId);
    let queryParam2 = new HttpParams().append("reqDate",date);
    var body = 'id='+bookingId+'=mypassword'+date;
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/order_count_by_bookingid?id=`+bookingId+`&reqDate=`+date,'');
  }
}
