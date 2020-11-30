import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Drinks} from '../drinks';
import {DrinksService} from '../drinks.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-drinks-details',
  templateUrl: './drinks-details.component.html',
  styleUrls: ['./drinks-details.component.css'],
  providers : [DrinksService]
})
export class DrinksDetailsComponent implements OnInit {

  constructor(
    private drinkService: DrinksService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  drink: Drinks;

  ngOnInit() {

    this.route.params.pipe(
      switchMap((params: Params) => {
        // console.log(params['drinkid']);
        return this.drinkService.getSingleDrink(params['drinkid']);
      }))
      .subscribe((drink: Drinks) => {
        this.drink = drink;
      });

  }
  // add to cart
  addToCart(drink: Drinks){
    this.drinkService.addToCart(drink);

  }


}
