import { Component, Input, OnInit } from '@angular/core';
import {Siteuser} from "../siteuser";
import {SiteuserServiceService} from "../siteuser-service.service";
import {Drinks} from '../drinks';
import {DrinksService} from '../drinks.service';
import {ModalService} from "../modal.service";
import {ActivatedRoute, Router, Params} from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[SiteuserServiceService]
})
export class HomepageComponent implements OnInit {



  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    animateOut: 'fadeOut',
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  drinks : Drinks[];
  siteusers : Siteuser[];
  @Input() loading : boolean = true;

  constructor(private drinkService : DrinksService, private route : ActivatedRoute, private router : Router,private siteUserService : SiteuserServiceService) { }

  ngOnInit() {

    this.drinkService.getDrinks()
    .then((drinks : Drinks[]) => {
      this.loading = true;
      this.drinks = drinks.map(drink => {
        if(drink){
          this.loading = false;
        }
        return drink;
      });
  });


  }

  addToCart(drink: Drinks){
    this.drinkService.addToCart(drink);
    this.router.navigate(['/']);
  }


}
