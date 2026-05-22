import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, MaybeAsync, GuardResult, ActivatedRouteSnapshot } from '@angular/router';
import { Auth } from '../services/auth';

@Injectable()
export class AuthorizationGuard {

  constructor(private authService : Auth,
              private router : Router) {}

  canActivate(route : ActivatedRouteSnapshot,
              state : RouterStateSnapshot) : MaybeAsync<GuardResult> {
    if(this.authService.isAuthenticated) {
      let requiredRoles = route.data['roles'];
      let userRoles = this.authService.roles;
      for (let role of userRoles) {
        if(requiredRoles.includes(role)) {
          return true;
        }
      }
      return false;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
