import { Injectable } from '@angular/core';
import {Contact} from "./contact";
import {Http} from "@angular/http";
import {promise} from "selenium-webdriver";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  //url for contact api
  private url = 'http://localhost:3000/api/contact';

  constructor(private http: Http) { }

  //create contact
  createContact(newContact : Contact) : Promise <void | Contact >{
    return this.http.post(this.url,newContact)
      .toPromise()
      .then(response => response.json() as Contact)
      .catch(this.handleError);
  }


  private handleError(error: any){
    console.log("error");
  }

}
