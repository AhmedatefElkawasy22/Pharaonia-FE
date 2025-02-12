import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Offer } from '../../Models/offer';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private _http: HttpClient) {}

  GetAllOffers(): Observable<Offer[]> {
    return this._http.get<Offer[]>(
      `${environment.BaseURL}/Get-All-Offers`
    );
  }
  GetOffersAvailableBasedOnNumber(number: number) : Observable<Offer[]> {
     return this._http.get<Offer[]>(
      `${environment.BaseURL}/Get-Offers-Available-Based-On-Number/${number}`
     )
  }

  GetOfferByID(OfferID: number): Observable<Offer> {
    return this._http.get<Offer>(
      `${environment.BaseURL}/Get-Offer-By-ID/${OfferID}`
    );
  }

  GetAvailableOffers(): Observable<Offer[]> {
    return this._http.get<Offer[]>(
      `${environment.BaseURL}/Get-All-Offers-Available`
    );
  }
}
