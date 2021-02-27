import { Options } from '@angular-slider/ngx-slider/options';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductCategory } from 'src/app/interfaces/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
import { UrlService } from 'src/app/services/url.service';
declare const VendiGO: any;
declare let $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productData: Product;
  productList: Array<Product>;
  loading: boolean = false;
  productCategoryData: ProductCategory;
  productCategoryList: Array<ProductCategory>;

  category: string;
  minValue: number = 200;
  maxValue: number = 3000;
  options: Options = {
    floor: 0,
    ceil: 5000,
    showTicks: true,
    tickStep: 1000,
    getLegend: (value: number): string => {
      return value.toString();
    },
    draggableRange: true,
    translate: (value: number): string => {
      return '$' + value;
    },
    showSelectionBar: true,
    selectionBarGradient: {
      from: '#fff',
      to: '#f95a3f'
    }
  };

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    public productCategoryService: ProductCategoryService,
    public urlService: UrlService
  ) {

    this.route.queryParams.subscribe(params => {
      let cat = params['cat'];
      console.log(cat);
      this.category = cat;

      let minPrice = params['from'];
      console.log(minPrice);
      if (!isNaN(minPrice))
        this.minValue = minPrice;

      let maxPrice = params['to'];
      console.log(maxPrice);
      if (maxPrice)
        this.maxValue = maxPrice;

    });
  }

  ngOnInit(): void {
    VendiGO.onReady();
    this.getProductData();
    this.getProductCategoryData();
    this.loading = true;
  }

  getProductData(): void {
    this.productService.productData.subscribe(data => {
      this.productList = data;
      this.loading = false;
    });
  }

  getProductCategoryData(): void {
    this.productCategoryService.productCategoryData.subscribe(data => {
      this.productCategoryList = data;
    })
  }

}
