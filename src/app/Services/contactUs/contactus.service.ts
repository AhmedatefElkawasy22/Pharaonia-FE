import { ContactUs } from './../../Models/contact-us';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private _http: HttpClient) {}

  GetAllContact():Observable<ContactUs[]>
  {
    return this._http.get<ContactUs[]>(`${environment.BaseURL}/Get-All-ContactUS`);
  }
  AddContactUs(contactData:any):Observable<any>
  {
    return this._http.post(`${environment.BaseURL}/Add-ContactUS`, contactData,{responseType:'text'});
  }



}
