import { Component } from '@angular/core';
import { NavigationStart, Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showHeader: boolean = true;
  showFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('Nav started');
        console.log(event);
        if (event.url.includes('about')) {
          setInterval(function () {
            $('.eapps-link').remove();
          }, 100)
        }
        if (event.url.includes('home')) {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
      if (event instanceof NavigationEnd) {
        const currentComponent = (router as any).rootContexts.contexts
          && (router as any).rootContexts.contexts.get('primary')
          && (router as any).rootContexts.contexts.get('primary').outlet.component;
        const componentName = currentComponent.constructor.name;
        if (componentName === 'PageNotFoundComponent') {
          this.showHeader = false;
          this.showFooter = false;
        }
      }
    });
  }

  ngOnInit() {

  }

}


