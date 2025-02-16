import { ContactUs } from './../../Models/contact-us';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environment/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { AccountServiceService } from '../account/account-service.service';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private _http: HttpClient, private _accountService: AccountServiceService) { }

  GetAllContact(): Observable<ContactUs[] | null> {
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.get<ContactUs[]>(`${environment.BaseURL}/Get-All-ContactUS`,{headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  GetContactById(Id:number):Observable<ContactUs| null>
  {
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.get<ContactUs>(`${environment.BaseURL}/Get-ContactUS-By-ID/${Id}`, {headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  AddContactUs(contactData: any): Observable<any> {
    return this._http.post(`${environment.BaseURL}/Add-ContactUS`, contactData, { responseType: 'text' });
  }

  DeleteContactUs(Id: number): Observable<any> {
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.delete(`${environment.BaseURL}/Delete-ContactUS/${Id}`, { responseType: 'text', headers });
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  MarkAsConacted(Id: number): Observable<any> {
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.put(`${environment.BaseURL}/Mark-As-Contacted/${Id}`, {}, { responseType: 'text', headers });
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

}
