import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Request } from 'src/app/interfaces/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  requestData = new BehaviorSubject<Array<Request>>(null);

  private url = `${environment.url}requests`;

  constructor(private http: HttpClient) {
    this.getRequestData();
  }

  private getRequestData(): void {
    this.http.get<Array<Request>>(this.url)
      .subscribe(data => {
        this.requestData.next(data)
      });
  }

  addRequest(newRequest: Request): void {

    this.http.post(this.url, newRequest)
      .subscribe(() => {
        this.getRequestData()
      })
  }

}