import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router : Router, private authenticationService : AuthenticationService ) { }


  canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot){
//     if(localStorage.getItem('fbID')){
//       return true;
//     }
    this.router.navigate(['/login'],{queryParams: { return: state.url}})

    if (!this.authenticationService.isLoggedIn()){
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
