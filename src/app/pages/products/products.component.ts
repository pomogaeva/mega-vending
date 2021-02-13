import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  imageUrl = `http://plushtoys-lb.com/megavending`;
  productData: Product;
  productList: Array<Product>;

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.getProductData();

  }

  getProductData(): void {
    this.productService.productData.subscribe(data => {
      this.productList = data;
    });
  }
}
