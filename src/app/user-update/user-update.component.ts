import { Component, OnInit } from '@angular/core';
import {SiteuserServiceService} from "../siteuser-service.service";
import {Siteuser} from "../siteuser";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  constructor(private siteUserService : SiteuserServiceService, private route: ActivatedRoute,
              private router: Router) { }


  updateUser: Siteuser;
  ngOnInit() {
    console.log(this.siteUserService.getSingleUser('5d9d67a98d312f32c032bca9'));
    this.route.params.pipe(
      switchMap((params: Params)=>{
        return this.siteUserService.getSingleUser(params['userid'])
      }))
      .subscribe((updateUser: Siteuser)=>{
        this.updateUser = updateUser;

      });
  }

  public userupdate(updateUser : Siteuser): void {
    this.siteUserService.userUpdate(updateUser);
     this.router.navigate(['/users']);
  }

  pageContent = {
    header: {
      title:'',
      body:''
    }
  }
}
