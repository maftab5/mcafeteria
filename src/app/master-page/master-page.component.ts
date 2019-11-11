import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Siteuser} from "../siteuser";
import {Loginusers} from "../loginusers";
import {Router} from "@angular/router";
import {ModalService} from "../modal.service";
import {HistoryService} from "../history.service";
import {DrinksService} from "../drinks.service";

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {
  //for modal
  bodyText: string;
  //end modal
  cartCount : any;

  constructor(
    private authenticationService : AuthenticationService,
    private router : Router,
    private modalService : ModalService,
    private historyService : HistoryService,
    private drinkService: DrinksService
  ) { }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal ';


  }

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
