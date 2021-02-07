import { Component, OnInit } from '@angular/core';
import { HomeSlide } from 'src/app/interfaces/home-slide';
import { HomeSlidesService } from 'src/app/services/home-slides.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeSlideData: HomeSlide;
  homeSlidesList: Array<HomeSlide>;

  constructor(
    public homeSlidesService: HomeSlidesService
  ) {
  }

  ngOnInit(): void {
    this.getHomeSlides();
  }

  getHomeSlides(): void {
    this.homeSlidesService.homeSlideData.subscribe(data => {
      this.homeSlidesList = data;
    });
  }

  // slides = [
  //   { img: "http://placehold.it/350x150/000000" },
  //   { img: "http://placehold.it/350x150/111111" },
  //   { img: "http://placehold.it/350x150/333333" },
  //   { img: "http://placehold.it/350x150/666666" }
  // ];

  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 3000, "fade": true, "appendDots": true };

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

}
