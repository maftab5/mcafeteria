import { Component, OnInit } from '@angular/core';
import {Drinks} from "../drinks";
import {DrinksService} from "../drinks.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";



@Component({
  selector: 'app-drinks-create',
  templateUrl: './drinks-create.component.html',
  styleUrls: ['./drinks-create.component.css'],
  providers:[DrinksService]
})
export class DrinksCreateComponent implements OnInit {

  createForm : FormGroup;
  submitted = false;
  loading = false;


  // for image upload
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;



  public newDrink: Drinks = {
     _id:'',
     name:'',
     description:'',
     nutrition:'',
     price:0,
     image:'',
     ingredients:'',
     category:'',
     status:0,
     qty:1
   }


  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private drinkService : DrinksService,
    private  authenticationService : AuthenticationService
  ) { }


  // public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});





  ngOnInit() {

     this.createForm =  this.formBuilder.group({
       name:['',Validators.required],
       description:['',Validators.required],
       nutrition:['',Validators.required],
       price:['',Validators.required],
       ingredients:['',Validators.required],
       category:['',Validators.required],
       image:'',
       qty:1
     });




  }


  public isLoggedIn() : boolean {
     return this.authenticationService.isLoggedIn();
  }


   public getUsername() : string {
     const {firstName} = this.authenticationService.getCurrentUser();

     return firstName ? firstName : 'Guest';
   }



  get f(){
     return this.createForm.controls;
  }

  // for image upload
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    // this.createForm.get('image').setValue(this.fileData);
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }


  public onSubmit() : void{
     // this.loading = true;
     this.submitted = true;


     if (this.createForm.invalid){
       return;
     }
const data = new FormData();
     // data.append('drinks',this.createForm.value);
     this.createForm.value.image =  this.previewUrl;
     // console.log(data);
     this.drinkService.createDrink(this.createForm.value);
     this.router.navigate(['/drink']);
  }

}
