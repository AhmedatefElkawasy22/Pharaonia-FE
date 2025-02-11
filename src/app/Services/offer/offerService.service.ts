import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Offer } from '../../Models/offer';
// import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private _http: HttpClient) {}

  GetAllOffers(): Observable<Offer[]> {
    return this._http.get<Offer[]>(`${environment.BaseURL}/Get-All-Offers`);
  }

  GetOfferByID(offerId: number): Observable<Offer> {
    return this._http.get<Offer>(
      `${environment.BaseURL}/Get-Offer-By-ID/${offerId}`
    );
  }

  GetAvailableOffers(): Observable<Offer[]> {
    return this._http.get<Offer[]>(
      `${environment.BaseURL}/Get-All-Offers-Available`
    );
  }
  // DeleteOffer(offerId: number): Observable<void> {
  //   return this._http.delete<void>(
  //     `${environment.BaseURL}/Delete-Offer/${offerId}`
  //   );
  // }
}
