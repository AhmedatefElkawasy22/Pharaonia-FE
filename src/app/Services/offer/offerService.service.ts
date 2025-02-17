import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Offer } from '../../Models/offer';
import { AccountServiceService } from '../account/account-service.service';
import { Image } from '../../Models/image';
import { BookOffer } from '../../Models/book-offer';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private _http: HttpClient, private _accountService: AccountServiceService) { }

  GetAllOffers(): Observable<Offer[] | null> {
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.get<Offer[]>(`${environment.BaseURL}/Get-All-Offers`,{headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  GetOffersAvailableBasedOnNumber(number: number): Observable<Offer[]> {
    return this._http.get<Offer[]>(
      `${environment.BaseURL}/Get-Offers-Available-Based-On-Number/${number}`
    )
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

  getExpiredOffers(): Observable<Offer[] | null> {
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.get<Offer[]>(
        `${environment.BaseURL}/Get-Offers-Expired`
      ,{headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  DeleteOffer(offerId: number): Observable<any> {
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.delete(`${environment.BaseURL}/Delete-Offer/${offerId}`,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  ReactiveOffer(offerId: number): Observable<any> {
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.put(`${environment.BaseURL}/Reactivate-Offer/${offerId}`,{},{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  AddOffer(Body:any) : Observable<any>{
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.post(`${environment.BaseURL}/Add-offer`,Body,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  updateOffer(Body:any,Id:number): Observable<any>{
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.put(`${environment.BaseURL}/Update-Offer/${Id}`,Body,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  GetImagesOfOffer(Id:number): Observable<Image[] | null> {
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.get<Image[]>(`${environment.BaseURL}/Get-Images-Of-Offer/${Id}`,{headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  AddImagesToOffer(Id:number,Body:any): Observable<any>{
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.post(`${environment.BaseURL}/Add-Images-To-Offer/${Id}`,Body,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  DeleteAllImagesFromOffer(Id:number): Observable<any>{
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.delete(`${environment.BaseURL}/Delete-All-Image-From-Offer/${Id}`,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }
  
  DeleteImageFromOffer(Id:number) : Observable<any>{
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.delete(`${environment.BaseURL}/Delete-Image-From-Offer/${Id}`,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  // book offer 
  GetAllBookings():Observable<BookOffer[] | null>
  {
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.get<BookOffer[]>(`${environment.BaseURL}/Get-All-Bookings`,{headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  GetBookingById(Id:number):Observable<BookOffer | null>
  {
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.get<BookOffer>(`${environment.BaseURL}/Get-Booking-Offer-By-ID/${Id}`, {headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }

  GetBookingsByOfferId(Id:number):Observable<BookOffer[] | null>
  {
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.get<BookOffer[]>(`${environment.BaseURL}/Get-All-Bookings-By-OfferId/${Id}`, {headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }
  
  AddBookingoffer(Id:number,Body:any): Observable<any>
  {
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.post(`${environment.BaseURL}/Add-Book-Offer/${Id}`,Body,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }
} 
