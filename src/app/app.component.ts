import { Component } from '@angular/core';
import { NavigationStart, Router,Event} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showHeader:boolean = true;
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('Nav started');
        console.log(event)
        if(event.url.includes('home')) {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
}

  ngOnInit() {

  }

}


