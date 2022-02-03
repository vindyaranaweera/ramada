import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FrontOfficeService {

  private apiServerUrl="environment.apiBaseUrl"

  constructor(private http:HttpClient) { }

  public findGuest(IdNo:any):Observable<any>{
    let queryParams = new HttpParams().append("idNo",IdNo);
    return this.http.get<any>(`${this.apiServerUrl}/api/guest_controller/get_detailsbyidno/`,{params:queryParams});
  }
}
