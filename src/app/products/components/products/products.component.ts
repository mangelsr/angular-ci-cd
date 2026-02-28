import { Component, OnInit, inject } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ValueService } from 'src/app/services/value.service';

import { ProductComponent } from '../product/product.component';


@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    imports: [
    ProductComponent
],
})
export class ProductsComponent implements OnInit {
  private productsService = inject(ProductsService);
  private valueService = inject(ValueService);

  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  promiseResponse = '';

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    this.productsService.getAll(this.limit, this.offset).subscribe({
      next: (products) => {
        this.products = [...this.products, ...products];
        this.status = 'success';
        this.offset += this.limit;
      },
      error: (error) => {
        setTimeout(() => {
          this.products = [];
          this.status = 'error';
        }, 3000);
      },
    });
  }

  async callPromise() {
    const resposne = await this.valueService.getPromiseValue()
    this.promiseResponse = resposne;
  }
}
