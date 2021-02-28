import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productData = new BehaviorSubject<Array<Product>>(null);

  private url = `${environment.url}/products`;

  constructor(private http: HttpClient) {
    this.getProductData();
  }

  public getProductData(): void {
    this.http.get<Array<Product>>(this.url)
      .subscribe(data => {
        this.productData.next(data)
      });
  }

  public getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url);
  }

  public getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${productId}`)
  }
}
