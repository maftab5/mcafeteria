import { Component, OnInit,Input } from '@angular/core';
import {Drinks} from '../drinks';
import {DrinksService} from '../drinks.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
import Swal from 'sweetalert2';
import {Loginusers} from "../loginusers";

import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {


  swal: any;
  drinks : Drinks[];
  filterDrinks : Drinks[];
  categories : any;
  selectedCategory : any;
  @Input() loading : boolean = true;

  constructor(private drinkService : DrinksService, private route : ActivatedRoute, private router : Router,
              private authenticationService: AuthenticationService) { }

  async ngOnInit() : Promise<void>{

   await this.drinkService.getDrinks()
      .then((drinks : Drinks[]) => {
        this.drinks = drinks.map(drink => {
          if(drink){
            this.loading = false;
          }
          return drink;
        });
    });
  
  this.onSelect();
  this.getCategories();
  

  }

  getCategories(){
    this.categories= [...new Set(this.drinks.map(drink => drink.category))];
  }

  onSelect(category: String | void) : void{
   

    console.log(this.selectedCategory);
    if(category){
      this.selectedCategory = category;
      this.filterDrinks = this.drinks.filter(drink => drink.category === category);
    }else{
      this.selectedCategory = "All";
      this.filterDrinks = this.drinks;
    }
    
  }



  public isLoggedIn() : boolean{
    return this.authenticationService.isLoggedIn();
  }

  public getUsername() : string{
    const user : Loginusers = this.authenticationService.getCurrentUser();
    // console.log(user);
    return user ? user.firstName : 'Guest';
  }



  // add to cart
  addToCart(drink: Drinks){
    this.drinkService.addToCart(drink);
    this.router.navigate(['/drink']);
  }



  // delete drink
  public deleteDrink(drinkid: string) : void {


    Swal.fire({
      title: 'Are you sure, you want to delete?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      width:500
    }).then((result) => {
      if (result.value) {
        this.drinkService.deleteDrink(drinkid);

         this.router.navigate(['/drink']);
        Swal.fire(

          'Deleted!',
          'Drink has has been deleted.',
          'success'
        )
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'The item is safe',
          'error'
        )
      }
    });




  }


  // confirm drink
  public confirmDrink(drink: Drinks) : void {
    this.drinkService.confirmDrink(drink);
    this.router.navigate(['/drink']);
  }
}
