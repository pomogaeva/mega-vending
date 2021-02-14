import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductCategory } from 'src/app/interfaces/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
import { Options } from 'ng5-slider';
declare const VendiGO: any;
declare let $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  imageUrl = `http://plushtoys-lb.com/megavending`;
  productData: Product;
  productList: Array<Product>;

  productCategoryData: ProductCategory;
  productCategoryList: Array<ProductCategory>;

  category: string;

  minValue: number = 1000;
  maxValue: number = 2000;
  options: Options = {
    floor: 0,
    ceil: 3000,
    showTicks: true,
    tickStep: 500,
    draggableRange: true,
    translate: (value: number): string => {
      return '$' + value;
    }
  };

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    public productCategoryService: ProductCategoryService
  ) {
  }

  ngOnInit(): void {
    VendiGO.onReady();
    this.getProductData();
    this.getProductCategoryData();

    $(".js-range-slider").ionRangeSlider({

    });
  }

  getProductData(): void {
    this.productService.productData.subscribe(data => {
      this.productList = data;
    });
  }

  getProductCategoryData(): void {
    this.productCategoryService.productCategoryData.subscribe(data => {
      this.productCategoryList = data;
    })
  }

}
