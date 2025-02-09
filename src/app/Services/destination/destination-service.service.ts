import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Destination } from '../../Models/destination';
import { environment } from '../../../environment/environment';
import { AccountServiceService } from '../account/account-service.service';

@Injectable({
  providedIn: 'root'
})

export class DestinationServiceService {

  constructor(private _http: HttpClient,private _accountService: AccountServiceService) { }


  GetDestinations():Observable<Destination[]>
  {
    return this._http.get<Destination[]>(`${environment.BaseURL}/Get-All-Destinations`);
  }

  GetDestinationById(id:number):Observable<Destination>
  {
    return this._http.get<Destination>(`${environment.BaseURL}/Get-Destination-By-Id/${id}`);
  }

  GetDestinationBasedOnCategory(Category:number):Observable<Destination[]>
  {
    return this._http.get<Destination[]>(`${environment.BaseURL}/Get-Destinations-Based-On-Category/${Category}`);
  }

  GetImagesOfDestination(id:number):Observable<any>{
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.get(`${environment.BaseURL}/Get-Images-Of-Destination/${id}`,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }
  
  AddDestination(body:any):Observable<any>
  {
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.post(`${environment.BaseURL}/Add-Destination`,body,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }
  
  AddImageToDestination(id:number,body:any):Observable<any>{
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.post(`${environment.BaseURL}/Add-Image-To-Destination/${id}`,body,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  updateImageOfDestination(id:number,body:any):Observable<any>{
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.put(`${environment.BaseURL}/Update-Images-Of-Destination/${id}`,body,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  UpdateDestination(id:number,body:any):Observable<any>{
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.put(`${environment.BaseURL}/Update-Destination/${id}`,body,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  DeleteDestination(id:number):Observable<any>{
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.delete(`${environment.BaseURL}/Delete-Destination/${id}`,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  

}
