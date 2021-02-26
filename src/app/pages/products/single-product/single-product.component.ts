import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductCategory } from 'src/app/interfaces/product-category';
declare const VendiGO: any;

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  imageUrl = `http://plushtoys-lb.com/megavending`;
  productId: number;
  product: Product;
  productData: Product;
  productList: Array<Product>;
  productCategoryList: Array<ProductCategory>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    VendiGO.onReady();
    this.route.params.subscribe(params => this.getProductInfo(params.productId));
    this.getProductData();
    this.getProductCategoryData();
  }

  getProductCategoryName(product: Product) {
    return this.productCategoryList.filter((cat) => cat.id == parseInt(product.category))[0].name;
  }

  private async getProductInfo(productId: number): Promise<void> {
    this.product = await this.productService.getProduct(productId).toPromise();
  }

  getProductData(): void {
    this.productService.productData.subscribe(data => {
      this.productList = data;
    });
  }

  getCategory(): any {
    return "2"
  }

  getProductCategoryData(): void {
    this.productCategoryService.productCategoryData.subscribe(data => {
      this.productCategoryList = data;
    })
  }

  slideConfig = {
    "autoplay": true,
    "dots": true,
    "appendDots": "#slick-dots--container-2",
    "arrows": false,
    "speed": 1200,
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "responsive": [
      {
        "breakpoint": 575,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2
        }
      },
      {
        "breakpoint": 767,
        "settings": {
          "slidesToShow": 3,
          "slidesToScroll": 1
        }
      },
      {
        "breakpoint": 991,
        "settings": {
          "slidesToShow": 4,
          "slidesToScroll": 1
        }
      },
      {
        "breakpoint": 1199,
        "settings": {
          "slidesToShow": 4,
          "slidesToScroll": 1
        }
      }]
  };

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

}
