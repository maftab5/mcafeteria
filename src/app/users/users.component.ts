import { Component, OnInit } from '@angular/core';
import {Siteuser} from "../siteuser";
import {SiteuserServiceService} from "../siteuser-service.service";
import {ActivatedRoute,Router} from "@angular/router";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  siteusers : Siteuser[];

  constructor(private siteUserService : SiteuserServiceService
       ,private route: ActivatedRoute,
              private router: Router

  ) { }

  ngOnInit() {



    this.siteUserService
      .getUsers()
      .then((siteusers : Siteuser[])=>{
        this.siteusers = siteusers.map(user =>{

          return user;
        })
      })

  }

  public userDelete(userid: string) : void {
    this.siteUserService.userDelete(userid);
    this.router.navigate(['/users']);
  }

}
