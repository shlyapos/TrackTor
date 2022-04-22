import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivateChild = this.canActivate;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    return this.auth.isAuthed() ? true : this.router.parseUrl('/auth');
  }
}