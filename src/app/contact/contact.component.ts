import { Component, OnInit } from '@angular/core';
import {Contact} from "../contact";
import {ContactService} from "../contact.service";

import { Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers:[ContactService]
})
export class ContactComponent implements OnInit {

  contactForm : FormGroup;
  submitted = false;
  loading = false;


  public newContact : Contact = {
    _id : '',
    name:'',
    email:'',
    address :'',
    comment:''
  }

  constructor(private contactService : ContactService,
              private formbuilder :FormBuilder,
              private router : Router) { }

  ngOnInit() {
    this.contactForm = this.formbuilder.group({
      name: ['', Validators.required],
      address:['', Validators.required],
      email:['',[ Validators.required, Validators.email]],
      comment:['', Validators.required]
    })
  }

  get f(){
    return this.contactForm.controls;
  }

  public onSubmit() : void {
    this.loading = true;
    this.submitted = true;
    if (this.contactForm.invalid){
      return;
    }else{
      this.contactService.createContact(this.contactForm.value);
      this.router.navigate(['/contact']);

    }
  }

}
