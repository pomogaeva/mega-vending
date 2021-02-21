import { Options } from '@angular-slider/ngx-slider/options';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductCategory } from 'src/app/interfaces/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
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
  loading: boolean = false;
  // handleQueryParams: string;
  productCategoryData: ProductCategory;
  productCategoryList: Array<ProductCategory>;

  category: string;

  minValue: number = 200;
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

    this.route.queryParams.subscribe(params => {
      let cat = params['cat'];
      console.log(cat);
      this.category = cat;

      let minPrice = params['from'];
      console.log(minPrice);
      if(minPrice)
      this.minValue = minPrice;

      let maxPrice = params['to'];
      if(maxPrice)
      this.maxValue = maxPrice;

      // this.handleQueryParams = 'merge';

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
