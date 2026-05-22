import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, MaybeAsync, GuardResult, ActivatedRouteSnapshot } from '@angular/router';
import { Auth } from '../services/auth';

@Injectable()
export class AuthGuard {

  constructor(private authService : Auth,
              private router : Router) {}

  canActivate(route : ActivatedRouteSnapshot,
              state : RouterStateSnapshot) : MaybeAsync<GuardResult> {
    if(this.authService.isAuthenticated) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}

//export const authGuard: CanActivateFn = (route, state) => {
//  return true;
//};
