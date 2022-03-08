import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FrontOfficeService {

  private apiServerUrl = 'http://143.198.36.89/api';
  // private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public getAllRooms():Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/api/room_controller/get_rooms`);
  }

  public getAllPacks():Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/api/booking_controller/get_active_packs`);
  }

  public findGuest(IdNo: any): Observable<any> {
    let queryParams = new HttpParams().append("idNo", IdNo);
    return this.http.get<any>(`${this.apiServerUrl}/api/guest_controller/get_detailsbyidno/`, {params: queryParams});
  }

  public saveGuest(body: any) {
    return this.http.post<any>(`${this.apiServerUrl}/api/guest_controller/add_newguest/`, body);
  }

  public getRoomId(roomNo: any) {
    let queryParams = new HttpParams().append("roomNo", roomNo);
    return this.http.get<any>(`${this.apiServerUrl}/api/room_controller/get_room_id_by_room_number`, {params: queryParams});
  }

  public addBooking(bookingBody: any) {
    return this.http.post<any>(`${this.apiServerUrl}/api/booking_controller/add_new_booking`,bookingBody);
  }

  public viewBooking(roomNo:any){
    let queryParams = new HttpParams().append("roomNo", roomNo);
    return this.http.get<any>(`${this.apiServerUrl}/api/booking_controller/get_bookingby_roomno`, {params: queryParams})
  }

  public checkOutBooking(bookingId:any){
    console.log(bookingId);
    let queryParams = new HttpParams().append("id",parseInt(bookingId));
    console.log(queryParams)
    return this.http.post<any>(`${this.apiServerUrl}/api/booking_controller/checkout`,queryParams);
  }

  public getGuestByDBId(id:any){
    let queryParams = new HttpParams().append("id", id);
    return this.http.get<any>(`${this.apiServerUrl}/api/guest_controller/get_guest_details_by_Id`, {params: queryParams})
  }

  public updateGuest(bookingBody:any){
    return this.http.post<any>(`${this.apiServerUrl}/api/booking_controller/update_booking`,bookingBody);
  }

  public getOrderDetails(date:any){
    let queryParams = new HttpParams().append("reqDate", date);
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/order_count`,queryParams);
  }

  public getCategoryCount(date:any,category:any){
    let body={reqDate:date,cate:category}
    let queryParams = new HttpParams().append("reqDate", date);
    let queryParams2 = new HttpParams().append("cate",category);
    return this.http.post<any>(`${this.apiServerUrl}/api/orderdtetails_controller/category_count?reqDate=`+date+`&cate=`+category,'');
  }

  public getAllOrders(date:any){
    let queryParams = new HttpParams().append("reqDate", date);
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/sort_order_by_date_andtime`,queryParams);
  }

  public getRoomNumber(bookingId:any){
    let queryParams = new HttpParams().append("id", bookingId);
    return this.http.post<any>(`${this.apiServerUrl}/api/booking_controller/get_roomno_by_bookingid`,queryParams);
  }

  public getCanceledOrderCount(date:any){
    let queryParams = new HttpParams().append("reqDate", date);
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/get_canceled_order_count`,queryParams);
  }

  public getOrderById(id:any){
    let queryParams = new HttpParams().append("id", id);
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/get_order_by_orderid`,queryParams);
  }

  getOrdersByBookingId(bookingId:any){
    let queryParams = new HttpParams().append("id", bookingId);
    return this.http.get<any>(`${this.apiServerUrl}/api/order_controller/get_order_historylist`,{params:queryParams});
  }

  public changeOrderStatus(OrderId:any,status:any){
    return this.http.post<any>(`${this.apiServerUrl}/api/order_controller/update_order_status?id=`+OrderId+`&status=`+status,'');
  }

  public getCheckoutCount(checkoutdate:any){
    return this.http.get<any>(`${this.apiServerUrl}/api/booking_controller/get_checkout_count`,{params:checkoutdate});
  }
}
