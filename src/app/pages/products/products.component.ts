import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductCategory } from 'src/app/interfaces/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
declare const VendiGO: any;

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
