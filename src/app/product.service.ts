import { Injectable } from '@angular/core';
import {Products} from "./products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Products[];
  constructor() {

    this.products = [
      { id: 'p01', name: 'name 1', price: 100, photo: 'thumb1.gif' },
      { id: 'p02', name: 'name 2', price: 200, photo: 'thumb2.gif' },
      { id: 'p03', name: 'name 3', price: 300, photo: 'thumb3.gif' }
    ];
  }

  findAll() : Products[]{
    return this.products;
  }

  find(id: string): Products {
    return this.products[this.getSelectedIndex(id)];
  }

  private getSelectedIndex(id: string) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return i;
      }
    }
    return -1;
  }

}
