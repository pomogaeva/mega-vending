import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: Array<Product>, minValue: number, maxValue: number, product: Product): Array<Product> {
    if ((!minValue || !maxValue) && !product) {
      return value;
    }

    if (!minValue && product) {
      minValue = product.price;
    }

    if (!maxValue && product) {
      maxValue = product.price;
    }

    return value.filter((el: Product) => {
      return (el.price >= minValue && el.price <= maxValue);
    });
  }

}
