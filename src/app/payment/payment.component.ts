import { Component, OnInit } from '@angular/core';
import {IPayPalConfig, ICreateOrderRequest} from "ngx-paypal";
import {Drinks} from "../drinks";
import {DrinksService} from "../drinks.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  total: any;
  showSuccess = false;
  cartProducts: Drinks[];


  constructor(
    private drinkService: DrinksService
  ) { }

  ngOnInit() {
    this.initConfig();
    this.total = localStorage.getItem('total');

    this.getCartProduct();
  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: localStorage.getItem('total'),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: localStorage.getItem('total')
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: localStorage.getItem('total'),
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          localStorage.removeItem('cart');
          localStorage.removeItem('total');

          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

// for cart items
  getCartProduct(){
    this.cartProducts = this.drinkService.getLocalCartProducts();
  }

}
