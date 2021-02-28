import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subscriptions } from '../interfaces/subscriptions';

@Injectable({
  providedIn: 'root'
})

export class SubscriptionsService {

  subscriptionData = new BehaviorSubject<Array<Subscriptions>>(null);

  public url = `${environment.url}/subscriptions`;

  constructor(public http: HttpClient) {
    this.getSubscriptionData();
  }

  public getSubscriptionData(): void {
    this.http.get<Array<Subscriptions>>(this.url)
      .subscribe(data => {
        this.subscriptionData.next(data)
      });
  }

  addSubscription(newSubscription: Subscriptions): void {

    this.http.post(this.url, newSubscription)
      .subscribe(() => {
        this.getSubscriptionData()
      })
  }
}
