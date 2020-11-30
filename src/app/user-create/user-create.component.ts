import { Component, OnInit } from '@angular/core';
import {Siteuser} from "../siteuser";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";

import {SiteuserServiceService} from "../siteuser-service.service";
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import {MustMatch} from "../customLib/confirmPassword";
import {AuthenticationService} from "../authentication.service";
import {HistoryService} from "../history.service";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers:[SiteuserServiceService]
})
export class UserCreateComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
loading = false;
  public newUser: Siteuser = {
     _id:'',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    level: 0,
    image: '',
    dob: null
  };

  constructor(private siteUserService : SiteuserServiceService,
              private formBuilder : FormBuilder,
              private router : Router,
              private authenticationService: AuthenticationService,
              private historyService : HistoryService
              ) { }

  ngOnInit() {


    this.registerForm = this.formBuilder.group({

      firstName:['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(4)]],
      confirmPassword: ['',Validators.required],
      level: 0,
      image: '',
      dob: null
    }
    ,{
      validator: MustMatch('password','confirmPassword')
    }
    );

  }

  get f(){
    return this.registerForm.controls;
  }

  public onSubmit() : void{
    this.loading = true;
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }

this.authenticationService.register(this.registerForm.value)
  .then(() => {
    this.router.navigateByUrl((this.historyService.getPreviousUrl()));
  })
  .catch(this.handleError);



    const userDetail = this.registerForm.value;
    console.log(userDetail.email);
let user = {
  name:userDetail.firstName,
  email:userDetail.email
}
    this.siteUserService.sendEmail("http://localhost:3000/api/users/email", user).subscribe(
      data=>{
        let res: any = data;
        console.log(`----- ${user.name} is successfully register and an email has been sent`);
      },err =>{
        console.log(err);
        this.loading = false;
      }
    )
    // this.siteUserService.createNewUser(this.registerForm.value);
    this.router.navigate(['/']);
  }

// public createNewUser(newUser: Siteuser) : void{
//     this.submitted = true;
//     if(this.registerForm.invalid){
//       return
//     }
//     this.siteUserService.createNewUser(newUser);
// }

  private handleError(error: any){
    console.log("error");
  }
}
