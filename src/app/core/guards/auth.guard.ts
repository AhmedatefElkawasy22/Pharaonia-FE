import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountServiceService } from '../../Services/account/account-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _accountService: AccountServiceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (this._accountService.isTokenValid()) {
      //consدole.log('token is valid');
      return true; 
    } else {
      this.router.navigate(['/admin/login']);
      return false;
    }
  }
}
