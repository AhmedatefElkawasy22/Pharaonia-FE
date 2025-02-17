import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment.development';
import { Observable, of } from 'rxjs';
import { Gallery } from '../../Models/gallery';
import { AccountServiceService } from '../account/account-service.service';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(
    private http: HttpClient,
    private _accountService: AccountServiceService
  ) { }

  GetGallery(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(`${environment.BaseURL}/api/Gallery/Get-All`);
  }


  DeleteAllImagesFromGallery():Observable<any>{
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.delete(`${environment.BaseURL}/api/Gallery/Delete-All-Images`,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }
  
  DeleteImage(id:number):Observable<any>{
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.delete(`${environment.BaseURL}/api/Gallery/Delete-Image/${id}`,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }
  
  AddImages(Body:any):Observable<any>{
    const token = localStorage.getItem("token");
    if (token && this._accountService.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post(`${environment.BaseURL}/api/Gallery/Add-Images`,Body,{responseType: 'text' , headers});
    } else {
      this._accountService.logout();
      return of(null);
    }
  }
}
