import {Inject, Injectable} from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import decode from 'jwt-decode';
import {BROWSER_STORAGE} from "./storage";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              @Inject(BROWSER_STORAGE) private storage : Storage
              ) { }
   canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = "admin";
    const token = this.storage.getItem('login');
    const tokenPayload = decode(token);

    if(!this.authenticationService.isLoggedIn() || tokenPayload.role !== expectedRole){
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
   }
}
