import { Component, OnInit } from '@angular/core';
import {DrinksService} from "../drinks.service";
import {Drinks} from "../drinks";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {switchMap} from "rxjs/operators";


@Component({
  selector: 'app-drinks-update',
  templateUrl: './drinks-update.component.html',
  styleUrls: ['./drinks-update.component.css']
})
export class DrinksUpdateComponent implements OnInit {

  constructor(
    private drinkService :DrinksService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  updateDrink : Drinks;


  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) =>{
        return this.drinkService.getSingleDrink(params['drinkid']);
        }))
      .subscribe((updateDrink : Drinks)=>{
        this.updateDrink = updateDrink;
      });
  }


  public drinkUpdate(updateDrink : Drinks): void{


    this.drinkService.drinkUpdate(updateDrink);
    //this.router.navigate(['/drink']);
  }

}
