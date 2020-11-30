import { Component, OnInit,HostListener,Inject } from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {AuthenticationService} from "../authentication.service";
import {Siteuser} from "../siteuser";
import {Loginusers} from "../loginusers";
import {Router,ActivatedRoute} from "@angular/router";
import {ModalService} from "../modal.service";
import {HistoryService} from "../history.service";
import {DrinksService} from "../drinks.service";
// import {AuthService, FacebookLoginProvider} from "angularx-social-login";

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {
  //for modal
  bodyText: string;
  user: any;
  //end modal
  cartCount : any;

  constructor(
    @Inject (DOCUMENT) private document: Document,
    private authenticationService : AuthenticationService,
    private router : Router,
    private modalService : ModalService,
    private historyService : HistoryService,
    public drinkService: DrinksService,
//     private _socioAuthServ: AuthService,
     private activatedRoute: ActivatedRoute
  ) { }



  ngOnInit() {
    this.bodyText = 'This text can be updated in modal ';


  }

@HostListener("window:scroll",[])
  onWindowScroll() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      document.getElementById("navbar").classList.add("scrolledNav");
      
    } else {
      document.getElementById("navbar").classList.remove("scrolledNav");
      
    }
  }


//for facebook login
// Method to sign in with facebook.
//signIn(platform: string): void {
//   platform = FacebookLoginProvider.PROVIDER_ID;
//   this._socioAuthServ.signIn(platform).then(
//   (response) => {
//     console.log(platform + " logged in user data is= ", response);
//     localStorage.setItem('fbID',JSON.stringify(response.email));
//     var fb = JSON.parse(localStorage.getItem('fbID'));
//     console.log(fb);
//     this.user = response;
//   }
// );
//}
  // // Method to log out.
  //signOut(): void {
//     this._socioAuthServ.signOut();
//     this.user = null;
//     console.log('User signed out.');
 // }


  public logOut(): void{
   localStorage.removeItem('cart');
    return this.authenticationService.logout();

  }
  public isLoggedIn() : boolean{
    return this.authenticationService.isLoggedIn();
  }

  public getUsername() : string{
    const user : Loginusers = this.authenticationService.getCurrentUser();
    // console.log(user);
    return user ? user.firstName : 'Guest';
  }


  public getUserId(): string{
    const user: Loginusers = this.authenticationService.getCurrentUserId();
    if(user){
      // console.log(user);
    }

    return user ? user._id : '0';
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
