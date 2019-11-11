import { Component, OnInit } from '@angular/core';
import {Siteuser} from "../siteuser";
import {SiteuserServiceService} from "../siteuser-service.service";
import {ModalService} from "../modal.service";

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
    pullDrag: false,
    dots: true,
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
    nav: true
  }


  siteusers : Siteuser[];

  constructor(private siteUserService : SiteuserServiceService) { }

  ngOnInit() {



  }



}
