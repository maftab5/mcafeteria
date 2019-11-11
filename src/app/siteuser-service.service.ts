import { Injectable,ElementRef } from '@angular/core';
import {Siteuser} from "./siteuser";
import { ModalService} from "./modal.service";
// @ts-ignore
import {Http, Response, HttpClient, HttpHeaders} from '@angular/http';
import {promise} from "selenium-webdriver";
import {Loginusers} from "./loginusers";
import {Authresponse} from "./authresponse";


@Injectable({
  providedIn: 'root'
})
export class SiteuserServiceService {

  private userUrl = 'https://capestone.herokuapp.com/api/users';

  //for modal close
  private element: any;

  constructor(private http: Http, private modalService : ModalService) {

  }

  //for login authentication
  public login(loginUser : Loginusers): Promise<void | Authresponse>{
    return this.makeApiCallLogin('login',loginUser);
  }


  public register(loginUser :Siteuser) : Promise<void | Authresponse>{
    return this.makeApiCall('register',loginUser);
  }


  private makeApiCall(urlPath: string, loginUser : Siteuser): Promise<void | Authresponse>{

    const url : string = `${this.userUrl}/${urlPath}`;
    return this.http.post(url,loginUser)
      .toPromise()
      .then(response => response.json() as Authresponse)
      .catch(this.handleError);
  }

  //api call function for login
  private makeApiCallLogin(urlPath: string, loginUser : Loginusers): Promise<void | Authresponse>{

    const url : string = `${this.userUrl}/${urlPath}`;

    return this.http.post(url,loginUser)
      .toPromise()
      .then(response => response.json() as Authresponse)
      .catch(this.handleError);

  }



// to get all the users
  getUsers(): Promise<void | Siteuser[]> {
    const regi = "register";
    const url: string = `${this.userUrl}/${regi}`;


    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Siteuser[])
      .catch(this.handleError);
  }

  //get single user
  getSingleUser(userid: string): Promise<void | Siteuser>{
    return this.http.get(this.userUrl + '/' + userid)
      .toPromise()
      .then(response => response.json() as Siteuser)
      .catch(this.handleError);
  }


  //create new user
  createNewUser(newUser: Siteuser) : Promise<void | Siteuser>{
    const regi = "register";
    const url: string = `${this.userUrl}/${regi}`;
    return this.http.post(url, newUser)
      .toPromise()
      .then(response => response.json() as Siteuser)
      .catch(this.handleError)

  }
// for email
  sendEmail(url, data ) {
    return this.http.post(url, data );
  }
  //end email


  //update user
  userUpdate(newUser: Siteuser): Promise<void | Siteuser>{

    return this.http.put(this.userUrl + '/' + newUser._id, newUser)
      .toPromise()
      .then(response => response.json() as Siteuser)
      .catch(this.handleError);
  }

  userDelete(userid: string) : Promise<void | string>{
    return this.http.delete(this.userUrl + '/' + userid)
      .toPromise()
      .then(response => response.json() as string)
      .catch(this.handleError);

  }

  private handleError(error: any){
    console.log("error");
  }
}
