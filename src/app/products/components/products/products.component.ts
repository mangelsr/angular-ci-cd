import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ValueService } from 'src/app/services/value.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  promiseResponse = '';

  constructor(
    private productsService: ProductsService,
    private valueService: ValueService,
  ) {}

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
