import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HomeSlide } from '../interfaces/home-slide';

@Injectable({
  providedIn: 'root'
})
export class HomeSlidesService {

  homeSlideData = new BehaviorSubject<Array<HomeSlide>>(null);

  private url = `${environment.url}home_slides`;

  constructor(private http: HttpClient) {
    this.getHomeSlidesData();
  }

  public getHomeSlidesData(): void {
    this.http.get<Array<HomeSlide>>(this.url)
      .subscribe(data => {
        this.homeSlideData.next(data)
      });
  }

  public getHomeSlides(): Observable<Array<HomeSlide>> {
    return this.http.get<Array<HomeSlide>>(this.url);
  }

  // public getProduct(productId: number): Observable<Product> {
  //   return this.http.get<Product>(`${this.url}/${productId}`)
  // }
}