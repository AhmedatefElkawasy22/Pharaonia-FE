import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; 

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  
  isLoggedin = signal<boolean>(false);

  constructor(private _http: HttpClient, private _router: Router) { 
    if (this.getUserToken() && this.isTokenValid()) {
      this.isLoggedin.update(() => true);
    }
  }
 
  register(body: any): Observable<any> {
    const token = localStorage.getItem("token");
    if (token && this.isTokenValid()) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.post(`${environment.BaseURL}/RegistrationAsAdmin`, body,{responseType: 'text' , headers});
    } else {
      this.logout();
      return of(null);
    }
  }

  Login(body: any) : Observable<any> {
    return this._http.post(`${environment.BaseURL}/Login`, body , {responseType: 'text'});
  }

  isTokenValid(): boolean {
    const token = this.getUserToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
      if (isTokenExpired) this.logout();
      return !isTokenExpired;
    } catch (error) {
      // console.error('Token decoding failed:', error);
      return false;
    }
  }

  logout() {
    this.isLoggedin.update(() => false);
    localStorage.removeItem('token');
    sessionStorage.clear(); 
    this._router.navigate(['/admin/login']);
  }
  

  getUserToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    } else {
      this.isLoggedin.update(() => false);
      return null;
    }
  }

  ForgotPassword(email: string) : Observable<any> {
    return this._http.post(`${environment.BaseURL}/api/Account/Forgot-Password/${email}`,{},{responseType: 'text'});
  }

  VerifyOTP(body:any) : Observable<any> {
    return this._http.post(`${environment.BaseURL}/api/Account/Verify-Otp`, body, {responseType: 'text'});
  }

  ResetPassword(body:any) : Observable<any> {
    return this._http.post(`${environment.BaseURL}/api/Account/Reset-Password`, body, {responseType: 'text'});
  }

}
