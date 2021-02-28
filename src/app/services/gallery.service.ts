import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gallery } from '../interfaces/gallery';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  galleryData = new BehaviorSubject<Array<Gallery>>(null);

  private url = `${environment.url}/gallery`;

  constructor(private http: HttpClient) {
    this.getGalleryData();
  }

  public getGalleryData(): void {
    this.http.get<Array<Gallery>>(this.url)
      .subscribe(data => {
        this.galleryData.next(data)
      });
  }

  public getGallery(): Observable<Array<Gallery>> {
    return this.http.get<Array<Gallery>>(this.url);
  }
}
