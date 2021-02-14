import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: Array<Product>, price: number, minPrice: number, maxPrice: number): Array<Product> {
    if (!price) {
      return value;
    }

    return value.filter((el: Product) => {
      return (el.price >= minPrice && el.price <= maxPrice);
    });
  }

}
