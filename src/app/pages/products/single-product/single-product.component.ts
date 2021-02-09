import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  productId: number;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    console.log('Heyyyyyyy single')
    this.route.params.subscribe(params => this.getProductInfo(params.productId));
  }

  private async getProductInfo(productId: number): Promise<void> {
    this.product = await this.productService.getProduct(productId).toPromise();
  }

}


  // @Input() product: Product;

  // constructor(
  //   private productService: ProductService
  // ) {
  // }

  // ngOnInit(): void {
  // this.route.params.subscribe(params => this.getProductData(params.productId));
  // }
