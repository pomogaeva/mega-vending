import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'productCategory'
})
export class ProductCategoryPipe implements PipeTransform {

  transform(value: Array<Product>, category: string, product: Product): Array<Product> {
    if ((!category || category == null) && !product) {
      return value;
    }
    if ((!category || category == null) && product) {
      category = product.category;
    }
    return value.filter((el: Product) => {
      return el.category.toLowerCase().indexOf(category.toLowerCase()) > -1;
    });
  }

}
