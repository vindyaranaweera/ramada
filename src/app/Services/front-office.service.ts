import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FrontOfficeService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
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

}
