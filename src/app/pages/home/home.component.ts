import { Component, OnInit } from '@angular/core';
import { HomeSlide } from 'src/app/interfaces/home-slide';
import { HomeSlidesService } from 'src/app/services/home-slides.service';
declare const VendiGO: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  imageUrl = `http://plushtoys-lb.com/megavending/`;
  homeSlideData: HomeSlide;
  homeSlidesList: Array<HomeSlide>;

  constructor(
    public homeSlidesService: HomeSlidesService
  ) {
  }

  ngOnInit(): void {
    VendiGO.onReady();
    this.getHomeSlides();
  }

  getHomeSlides(): void {
    this.homeSlidesService.homeSlideData.subscribe(data => {
      this.homeSlidesList = data;
    });
  }

  slideConfig = {
    "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 1200, "fade": true,
    "responsive": [
      {
        "breakpoint": 767,
        "settings": {
          "appendDots": "#start-screen__slider-nav"
        }
      }
    ]
  };

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

}
