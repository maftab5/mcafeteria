import { Component, OnInit } from '@angular/core';
import {Siteuser} from "../siteuser";
import {Router} from "@angular/router";
import {SiteuserServiceService} from "../siteuser-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
  providers: [SiteuserServiceService]
})
export class ForgetpasswordComponent implements OnInit {

  passwordForm: FormGroup;
  submitted =false;
  loading = false;

  constructor(private siteUserService : SiteuserServiceService,
              private formBuilder : FormBuilder,
              private router : Router,) { }

  ngOnInit() {

    this.passwordForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]]
    });
  }
  get f(){
    return this.passwordForm.controls;
  }

  public onSubmit(): void {
    this.loading = true;
    this.submitted = true;

    if(this.passwordForm.invalid){
      return;
    }
    const userdata = this.passwordForm.value;
    const email = userdata.email;

    this.siteUserService.fpassword("http://localhost:3000/api/users/fpassword" + "/"+ email,email).subscribe(
      data =>{
        let res: any =data;
      },err =>{
        console.log(err);
        this.loading =true;
      });
    this.router.navigate(['/']);



  }


}
