import { Component } from '@angular/core';
import { NavigationEnd, Event, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ngOnInit() {

  }

  // constructor(private elRef: ElementRef) {

  // }

  // ngOnInit() {
  //   $.getScript('/src/js/device.js');
  //   $.getScript('/node_modules/jquery/dist/jquery.min.js');
  //   $.getScript('/src/js/jquery-2.2.4.min.js');
  //   $.getScript('/node_modules/slick-carousel/slick.slick.min.js');
  //   $.getScript('/src/js/main.js'); //Add path to your custom js file
  // }

  // observer;

  // ngAfterViewInit() {
  //   this.observer = new MutationObserver(mutations => {

  //     console.log('Dom change detected...');
  //     $.getScript('/src/js/device.js');
  //     $.getScript('/node_modules/jquery/dist/jquery.min.js');
  //     $.getScript('/src/js/jquery-2.2.4.min.js');
  //     $.getScript('/node_modules/slick-carousel/slick/slick.min.js');
  //     $.getScript('/src/js/main.js'); //Add path to your custom js file

  //   });
  //   var config = { attributes: true, childList: true, characterData: true };

  //   this.observer.observe(this.elRef.nativeElement, config);
  // }
}


