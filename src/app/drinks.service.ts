import {Inject, Injectable} from '@angular/core';
import {Drinks} from './drinks';
import {HttpClient} from '@angular/common/http';
import {Http , HttpModule} from '@angular/http';
import {promise} from 'selenium-webdriver';
import {HttpHeaders} from '@angular/common/http';
import {BROWSER_STORAGE} from './storage';
import {AuthenticationService} from './authentication.service';
import {Observable} from "rxjs";
import {Items} from "./items";
import {Loginusers} from "./loginusers";

@Injectable({
  providedIn: 'root'
})
export class DrinksService {



 private navbarCartCount = 0;
  private drinkUrl = 'https://capestone.herokuapp.com/api/drinks';
  private countryUrl: string =  "https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json";
  constructor(
    private http: HttpClient,
    @Inject (BROWSER_STORAGE) private storage: Storage, private authenticationService: AuthenticationService
  ) {

  }


  // for image upload

// for countries
  getCountry() : Observable<any> {
    return this.http.get(this.countryUrl);
  }

  // get all the drinks
  getDrinks(): Promise <void | Drinks[] > {

    return this.http.get(this.drinkUrl)
      .toPromise()
      .then(response => response as Drinks[])
      .catch(this.handleError);
  }

  // for cart
  getItems(drinkid: string): Observable<Drinks>{
    return this.http.get<Drinks>(this.drinkUrl + '/' + drinkid);
  }


// get single drink
  getSingleDrink(drinkid: string): Promise <void | Drinks > {
    return this.http.get(this.drinkUrl + '/' + drinkid)
      .toPromise()
      .then(response => response as Drinks)
      .catch(this.handleError);
  }


  // to create drinks
  createDrink(newDrink: Drinks): Promise<void | Drinks> {
   
    return this.http.post(this.drinkUrl, newDrink, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
      .toPromise()
      .then(response => response as Drinks )
      .catch(this.handleError);
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
  public getToken() : string{
    return this.storage.getItem('login');
  }


  public getCurrentUserId(): Loginusers {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const {_id} = JSON.parse(atob(token.split('.')[1]));
      // console.log({_id});
      return {_id} as Loginusers;
    }
  }

  createorder() : Promise<void | Drinks[]>{
    const orders = this.getLocalCartProducts();
const data = {
  "items" : orders,
   "id" : this.getCurrentUserId()
}
    return this.http.post(this.drinkUrl + "/" + "orders",data)
      .toPromise()
      .then(response => response as Drinks[])
      .catch(this.handleError);

  }

// update drink
  drinkUpdate(updateDrink: Drinks): Promise<void | Drinks> {


    console.log(updateDrink)
    return this.http.put(
      this.drinkUrl + '/' + updateDrink._id, updateDrink, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } }
      )
      .toPromise()
      .then(response => response as Drinks)
      .catch(this.handleError);
  }


  // delete drink d
  deleteDrink(drinkid: string): Promise <void | string> {
    return this.http.delete(
      this.drinkUrl + '/' + drinkid, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } }
      )
      .toPromise()
      .then(response => response as string)
      .catch(this.handleError);
  }

  // confirm drinks
  confirmDrink(drink: Drinks): Promise <void | Drinks >{
    const url = this.drinkUrl + '/' + 'confirm';
    return this.http.put(url + '/' + drink._id, drink, { headers: { Authorization: `Bearer ${this.authenticationService.getToken()}` } })
      .toPromise()
      .then(response => response as Drinks)
      .catch(this.handleError);
  }



  // for cart
  addToCart(drinks: Drinks) : void {
    let products : Drinks[];
    let   items: Items[] = [];

    // localStorage.removeItem('cart');
    products = JSON.parse(localStorage.getItem('cart')) || [];
    products.push(drinks);
    // if(products){
    //   products.map(prod=>{
    //     return prod
    //   }).forEach( function(prod,index){
    //     if(prod._id == drinks._id){
    //       console.log("same");
    //       if(items.length > 0){
    //         items[index].quantity += items[index].quantity;
    //         //console.log(items[index].quantity);
    //         console.log(items);
    //       }
    //
    //     }else{
    //       prod => items.push({product : prod,quantity : 1});
    //
    //     }
    //   });
    // }else{
    //   products.push(drinks);
    // }




    // console.log(items);



    // console.log(items);
    // products.forEach(function (item, index) {
    //   if(drinks._id == item._id){
    //
    //   }
    // })

    localStorage.setItem('cart',JSON.stringify(products));
     // console.log(products);
    this.calculateLocalCartProdCount();

  }


  // for order history
  orderhistory(order : Drinks[]){

  }

  // removing products from cart
  removeLocalCartProducts(product: Drinks) {
    const products: Drinks[] = JSON.parse(localStorage.getItem('cart'));
// use same for non repeat
    for(let i =0; i<products.length;i++){
      if(products[i]._id === product._id){
        products.splice(i,1);
        break;
      }
    }

    //readding the products after remove
    localStorage.setItem('cart',JSON.stringify(products));
  }



  // for cart count
  calculateLocalCartProdCount(){
   return this.navbarCartCount = this.getLocalCartProducts().length;

  }
  getLocalCartProducts(): Drinks[] {
    const products: Drinks[] = JSON.parse(localStorage.getItem('cart')) || [];
    // console.log(products);
    return  products;

  }

  private handleError(error: any) {

    console.log('error');
  }
}
