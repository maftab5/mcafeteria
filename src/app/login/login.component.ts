import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../customLib/confirmPassword";
import {AuthService, FacebookLoginProvider} from "angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id: number;
  email : any;


public formError : string = '';
  loginForm: FormGroup;
  submitted = false;
  user: any;
public credentials = {

  email:'',
  password:''
}
  constructor(private router: Router,
              private authenticationService: AuthenticationService
              , private formBuilder : FormBuilder,
              private activatedRoute: ActivatedRoute,
              private _socioAuthServ: AuthService) {

  // for facebook login


    // ends
    // another

  //
  // this.activatedRoute.queryParams.subscribe(params => {
  //   this.id = params['id'];
  //   if (this.id != null){
  //     localStorage.setItem('fbID',JSON.stringify(this.id));
  //   } else {
  //     this.id = JSON.parse(localStorage.getItem('fbID'));
  //   }
  // });

  }

  // //for facebook login
  // // Method to sign in with facebook.
  // signIn(platform: string): void {
  //   platform = FacebookLoginProvider.PROVIDER_ID;
  //   this._socioAuthServ.signIn(platform).then(
  //     (response) => {
  //       console.log(platform + " logged in user data is= ", response);
  //       this.user = response;
  //     }
  //   );
  // }
  //
  // // Method to log out.
  // signOut(): void {
  //   this._socioAuthServ.signOut();
  //   this.user = null;
  //   console.log('User signed out.');
  // }

  ngOnInit() {
   // for facebook login
   //  this.authenticationService.getFbProfile(this.id).subscribe(user =>{
   //    this.email = user['user']['email'];
   //  });

    this.loginForm = this.formBuilder.group({
        email: ['',[Validators.required]],
        password: ['',[Validators.required]],

      }

    );
  }

  get f(){
    return this.loginForm.controls;
  }




  public onLoginSubmit() : void{


    this.submitted = true;
    if(this.loginForm.invalid){
     return;
    }else{
      if( this.authenticationService.login(this.loginForm.value)){
        this.authenticationService.login(this.loginForm.value)
          .then(()=>this.router.navigate(['/admin']))
          .catch((err)=>{
            this.formError = "incorrect username or password"
          });

      }else{
        this.formError = "username or password incorrect";

      }


    }

  }
  private handleError(error: any){
    return error;
  }

}
