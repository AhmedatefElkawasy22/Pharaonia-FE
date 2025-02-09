import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor(private _http: HttpClient) { }

  GetAboutUs(): Observable<any> {
    return this._http.get<any>(`${environment.BaseURL}/Get-AboutUS` );
  }

}
