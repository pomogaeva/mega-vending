import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    VendiGO.onReady();
    this.route.params.subscribe(params => this.getProductInfo(params.productId));
    this.getProductData();
  }

  private async getProductInfo(productId: number): Promise<void> {
    this.product = await this.productService.getProduct(productId).toPromise();
  }

  getProductData(): void {
    this.productService.productData.subscribe(data => {
      this.productList = data;
    });
  }

  slideConfig = {
    "autoplay": true,
    "dots": true,
    "speed": 1200,
    "slidesToShow": 1,
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
