import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private apiServerUrl="environment.apiBaseUrl";

  constructor(private http:HttpClient) { }

  public checkLogin(userId:any):Observable<any>{
    let queryParams = new HttpParams().append("key",userId);
    return this.http.get<any>(`${this.apiServerUrl}/api/User_controller/user_login/`,{params:queryParams});
  }
}
