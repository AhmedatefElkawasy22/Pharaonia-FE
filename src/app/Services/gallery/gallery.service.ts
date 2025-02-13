import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment.development';
import { Observable } from 'rxjs';
import { Gallery } from '../../Models/gallery';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(

    private http:HttpClient,
  ) { }
GetGallery():Observable<Gallery[]>
{
  return this.http.get<Gallery[]>(`${environment.BaseURL}/api/Gallery/Get-All`);
}


}
