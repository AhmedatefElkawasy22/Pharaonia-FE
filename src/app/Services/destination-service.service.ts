import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment.development';
import { Destination } from '../Models/destination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DestinationServiceService {

  constructor(private _http: HttpClient) { }


  GetDestinations():Observable<Destination[]>
  {
    return this._http.get<Destination[]>(`${environment.BaseURL}/Get-All-Destinations`);
  }



  GetDestinationById(id:number):Observable<Destination>
  {
    return this._http.get<Destination>(`${environment.BaseURL}/Get-Destination-By-Id/${id}`);
  }

}
