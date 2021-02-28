import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeSlide } from 'src/app/interfaces/home-slide';
import { ProductCategory } from 'src/app/interfaces/product-category';
import { HomeSlidesService } from 'src/app/services/home-slides.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { IsotopeOptions } from 'ngx-isotope';
import { Gallery } from 'src/app/interfaces/gallery';
import { GalleryService } from 'src/app/services/gallery.service';
import { UrlService } from 'src/app/services/url.service';

declare const VendiGO: any;
declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public isotopeOptions: IsotopeOptions = {
    itemSelector: ".js-isotope__item",
    percentPosition: true,
    masonry: { "columnWidth": ".js-isotope__sizer" }
  };

  homeSlideData: HomeSlide;
  homeSlidesList: Array<HomeSlide>;

  productCategoryData: ProductCategory;
  productCategoryList: Array<ProductCategory>;

  galleryData: Gallery;
  galleryList: Array<Gallery>;

  constructor(
    public homeSlidesService: HomeSlidesService,
    private route: ActivatedRoute,
    public productCategoryService: ProductCategoryService,
    public galleryService: GalleryService,
    public urlService: UrlService
  ) {
  }

  ngOnInit(): void {
    VendiGO.onReady();
    this.getHomeSlides();
    this.getProductCategoryData();
    this.getGalleryData();
  }

  getHomeSlides(): void {
    this.homeSlidesService.homeSlideData.subscribe(data => {
      this.homeSlidesList = data;
    });
  }

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true,
    "arrows": false,
    "dots": true,
    "appendDots": "#start-screen__slider-nav",
    "autoplaySpeed": 1200,
    "fade": true,
    "responsive": [
      {
        "breakpoint": 767,
        "settings": {
          "appendDots": "#start-screen__slider-nav"
        }
      }
    ],
    // 'customPaging': function (slider, i) {
    //   console.log(slider);
    //   var slideNumber = (i + 1),
    //     totalSlides = slider.slideCount;
    //   return '<a class="custom-dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '</span></a>';
    // }
    customOnChange: function justChanged() {
      alert('I have changed');
    }
  };

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  getProductCategoryData(): void {
    this.productCategoryService.productCategoryData.subscribe(data => {
      this.productCategoryList = data;
    })
  }

  getGalleryData(): void {
    this.galleryService.galleryData.subscribe(data => {
      this.galleryList = data;
    })
  }
}