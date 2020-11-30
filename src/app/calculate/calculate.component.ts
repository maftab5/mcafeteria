import {Component, OnInit, OnChanges, SimpleChange, SimpleChanges, Input} from '@angular/core';
import {Drinks} from "../drinks";

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']
})
export class CalculateComponent implements OnInit {

  @Input() products: Drinks[];
  totalValue: any = 0;

  constructor() { }

ngOnChanges(changes: SimpleChanges){
    const dataChanges: SimpleChange = changes.products;
    const products: Drinks[] = dataChanges.currentValue;
    this.totalValue = 0;


    products.forEach((product)=>{
      this.totalValue +=  Number(product.price);


    })
  localStorage.setItem('total', this.totalValue);
}



  ngOnInit() {
    // console.log( localStorage.getItem('total'));
  }

}
