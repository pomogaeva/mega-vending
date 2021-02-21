import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: Array<Product>, minValue: number, maxValue: number, product: Product): Array<Product> {
    if ((minValue == undefined || maxValue == undefined) && !product) {
      return value;
    }

    if (minValue == undefined && product) {
      minValue = product.price;
    }

    if (maxValue == undefined && product) {
      maxValue = product.price;
    }

    return value.filter((el: Product) => {
      return (el.price >= minValue && el.price <= maxValue);
    });
  }

}
