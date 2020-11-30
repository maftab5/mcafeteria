import { Component, OnInit } from '@angular/core';
import {Drinks} from '../drinks';

import {DrinksService} from '../drinks.service';
import {ActivatedRoute, Router} from '@angular/router';
// http://learningprogramming.net/mean-stack/angular-6/build-shopping-cart-in-angular-6/
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

cartProducts: Drinks[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private drinkService: DrinksService
  ) { }

  ngOnInit() {
  this.getCartProduct();
  }

removeCartProduct(drink: Drinks){
    this.drinkService.removeLocalCartProducts(drink);
    this.getCartProduct();
  }

  getCartProduct(){
    this.cartProducts = this.drinkService.getLocalCartProducts();
  }



}
