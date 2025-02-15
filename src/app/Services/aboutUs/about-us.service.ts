import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { Observable, of } from 'rxjs';
import { AccountServiceService } from '../account/account-service.service';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor(private _http: HttpClient,private _accountServices:AccountServiceService) { }

  GetAboutUs(): Observable<any> {
    return this._http.get(`${environment.BaseURL}/Get-AboutUS`, { responseType: 'text' });
  }

  updateAboutUs(data: any): Observable<any> {
    const token = localStorage.getItem("token");
    if (token && this._accountServices.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.put(`${environment.BaseURL}/update-AboutUs`, data,{responseType: 'text' , headers});
    } else {
      this._accountServices.logout();
      return of(null);
    }
  }

  AddAboutUs(data: any): Observable<any> {
    const token = localStorage.getItem("token");
    if (token && this._accountServices.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.post(`${environment.BaseURL}/Add-AboutUs`, data,{responseType: 'text' , headers});
    } else {
      this._accountServices.logout();
      return of(null);
    }
  }
  
  DeleteAboutUs(): Observable<any> {
    const token = localStorage.getItem("token");
    if (token && this._accountServices.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.delete(`${environment.BaseURL}/Delete-AboutUs`,{responseType: 'text' , headers});
    } else {
      this._accountServices.logout();
      return of(null);
    }
  }

}
