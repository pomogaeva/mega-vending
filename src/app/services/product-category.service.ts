import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductCategory } from '../interfaces/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  productCategoryData = new BehaviorSubject<Array<ProductCategory>>(null);

  private url = `http://localhost:3000/product_categories`;

  constructor(private http: HttpClient) {
    this.getProductCategoryData();
  }

  public getProductCategoryData(): void {
    this.http.get<Array<ProductCategory>>(this.url)
      .subscribe(data => {
        this.productCategoryData.next(data)
      });
  }

  public getProductCategories(): Observable<Array<ProductCategory>> {
    return this.http.get<Array<ProductCategory>>(this.url);
  }
}
