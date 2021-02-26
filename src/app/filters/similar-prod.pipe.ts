import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'similarProd'
})
export class SimilarProdPipe implements PipeTransform {

  transform(value: Array<Product>, product: Product): Array<Product> {
    if (!product) {
      return value;
    }
    // if (!category && product) {
    //   category = product.category;
    // }
    return value.filter((el: Product) => {
      // return (el.price >= minValue && el.price <= maxValue)
      // return el.category.toLowerCase().indexOf(category.toLowerCase()) > -1;
    });
  }
}
