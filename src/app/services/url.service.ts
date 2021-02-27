import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  baseHref = 'http://plushtoys-lb.com/megavending';
  constructor(
  ) { }

  serverRelative(s: string): string {
    return `${this.baseHref}/${s}`;
  }

}