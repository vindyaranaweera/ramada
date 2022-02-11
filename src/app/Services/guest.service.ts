import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GuestService {

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

  public placeOrder(orderBody:any){
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
}
