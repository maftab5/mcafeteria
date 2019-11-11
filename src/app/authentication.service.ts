import { Injectable, Inject } from '@angular/core';
import {BROWSER_STORAGE} from "./storage";
import {HttpClient} from "@angular/common/http";
import {Loginusers} from "./loginusers";
import {Authresponse} from "./authresponse";
import {SiteuserServiceService} from "./siteuser-service.service";
import {promise} from "selenium-webdriver";
import {Siteuser} from "./siteuser";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage : Storage
       ,private siteUserService :SiteuserServiceService,
    private router: Router,
    private http: HttpClient
  ) { }

  public login(loginUser : Loginusers) : Promise<any>{


    return  this.siteUserService.login(loginUser)
      .then((authResp : Authresponse)=> this.saveToken(authResp.token));
  }

  public register(loginUser: Siteuser) : Promise<any>{
    return this.siteUserService.register(loginUser)
      .then((authResp: Authresponse)=>this.saveToken(authResp.token));

  }

  public logout() : void{
    this.storage.removeItem('login');
     this.router.navigate(['']);
  }

  public isLoggedIn() : boolean{
    const token: string = this.getToken();
    if(token){
      const payload = JSON.parse(atob(token.split('.')[1]));
// console.log(payload);
      // console.log(payload);

      return payload.exp > (Date.now() /1000);
    }else{
      return false;
    }
  }
  public getCurrentUser(): Loginusers {
    if(this.isLoggedIn()){
      const token : string = this.getToken();
      const {firstName} = JSON.parse(atob(token.split('.')[1]));
      // console.log({firstName});
      return {firstName} as Loginusers;
    }
  }


  public getCurrentUserId(): Loginusers {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const {_id} = JSON.parse(atob(token.split('.')[1]));
      // console.log({_id});
      return {_id} as Loginusers;
    }
  }


    public getToken() : string{
    return this.storage.getItem('login');
    }

    public saveToken(token: string){
    this.storage.setItem('login',token);

    }
}
