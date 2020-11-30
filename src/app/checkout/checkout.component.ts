import { Component, OnInit } from '@angular/core';
import {Billing} from "../billing";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DrinksService} from "../drinks.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  shippingForm: FormGroup;
  submitted = false;
  loading = false;

  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];

  public newBilling: Billing = {
    _id:'',
    firstName:'',
    lastName:'',

    address:'',
    address2:'',
    country:'',
    state:'',
    zipcode:''
  }



  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private drinkService: DrinksService
  ) { }

  ngOnInit() {
    this.getCountries();
    this.shippingForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName: ['',Validators.required],

      address: ['',Validators.required],
      address2:'',
      // country: ['',Validators.required],
      // state: ['',Validators.required],
      zipcode: ['',Validators.required],
    });
  }

  get f(){
    return this.shippingForm.controls;
  }

  public onSubmit(): void {
    this.loading = true;
    this.submitted = true;

    if(this.shippingForm.invalid){
      return;
    }else{
      this.router.navigate(['/payment'])
    }

  }


  // to get countries
  getCountries(){
    this.drinkService.getCountry().subscribe(data => {
      this.countryInfo = data.Countries;
    },err=>console.log(err),() => console.log('complete'))
  }

  onChangeCountry(countryValue) {
    this.stateInfo = this.countryInfo[countryValue].States;
    this.cityInfo = this.stateInfo[0].Cities;
    console.log(this.cityInfo);
  }

  onChangeState(stateValue){
    this.cityInfo = this.stateInfo[stateValue].Cities;
  }

}
