import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { HomeListComponent } from './home-list/home-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MasterPageComponent } from './master-page/master-page.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserUpdateComponent } from './user-update/user-update.component';



// additional
import {APP_BASE_HREF} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';

import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatOptionModule,
  MatTabsModule
} from '@angular/material';
import {MustMatchDirective} from './customLib/MustMatchDirective';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import {BadgeModule, MdbErrorDirective} from 'angular-bootstrap-md';
import { DrinksComponent } from './drinks/drinks.component';
import { DrinksUpdateComponent } from './drinks-update/drinks-update.component';
import { DrinksDetailsComponent } from './drinks-details/drinks-details.component';
import { DrinksCreateComponent } from './drinks-create/drinks-create.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import {AuthGuardService} from './auth-guard.service';
import {RoleGuardService} from './role-guard.service';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { CalculateComponent } from './calculate/calculate.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import {NgxPayPalModule} from "ngx-paypal";



@NgModule({
  declarations: [

    HomeListComponent,
    HomepageComponent,
    MasterPageComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserUpdateComponent,
    MustMatchDirective,
    AdminComponent,
    UsersComponent,
    LoginComponent,
    ModalComponent,
    DrinksComponent,
    DrinksUpdateComponent,
    DrinksDetailsComponent,
    DrinksCreateComponent,
    ContactComponent,
    AboutComponent,
    CartComponent,
    ProductComponent,
    CalculateComponent,
    CheckoutComponent,
    PaymentComponent
  ],
  imports: [
    CarouselModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    AppRoutingModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule,
    NgxPayPalModule,

    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'signup',
        component: UserCreateComponent
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuardService]

      },
      {
        path: 'userdetails/:userid',
        component: UserDetailsComponent
      },
      {
        path: 'userupdate/:userid',
        component: UserUpdateComponent
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      // for drinks
      {
        path: 'drink',
        component: DrinksComponent
      },
      {
        path: 'adddrinks',
        component: DrinksCreateComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'drink/:drinkid',
        component: DrinksDetailsComponent
      },
      {
        path: 'updateDrink/:drinkid',
        component: DrinksUpdateComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'deleteDrink/:drinkid',
        component: DrinksComponent,
        canActivate: [AuthGuardService]
      },

      // for contact
      {
        path: 'contact',
        component: ContactComponent
      },
      // for about us
      {
        path: 'about',
        component: AboutComponent
      },
      // for product confirmation

      {
        path: 'confirmDrink/:drinkid',
        component: DrinksComponent,
        canActivate: [AuthGuardService]
      },

      // for carts
      {
        path: 'cart',
        component: CartComponent
      },
      // for shipping
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      // for payment
      {
        path:'payment',
        component: PaymentComponent
      }

    ]),
    MatTabsModule,
    BadgeModule,
    MatOptionModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [MasterPageComponent]
})
export class AppModule { }
