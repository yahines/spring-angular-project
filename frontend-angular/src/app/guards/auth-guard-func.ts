import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Router, RouterStateSnapshot, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { Auth } from '../services/auth';

@Injectable({providedIn : 'root'})
export class PermissionService {

  constructor(private authService : Auth,
              private router : Router) {}

  canActivate(route : ActivatedRouteSnapshot) {
    if(this.authService.isAuthenticated) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}

export const authGuard: CanActivateFn = (route : ActivatedRouteSnapshot,
                                          state : RouterStateSnapshot) => {
  return inject(PermissionService).canActivate(route);
};
