import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: Array<Product>, price: number, minValue: number, maxValue: number): Array<Product> {
    if (!price) {
      return value;
    }

    return value.filter((el: Product) => {
      return (el.price >= minValue && el.price <= maxValue);
    });
  }

}
