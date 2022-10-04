import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../../models/product.model'
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product | null = null;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  type: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params) => {
        const productId = params.get('id');
        if (productId) {
          this.getProductDetail(productId);
        } else {
          this.goToBack();
        }
      });

    this.route.queryParamMap.subscribe(params => {
      this.type = params.get('type');
    });
  }

  private getProductDetail(productId: string) {
    this.status = 'loading';
    this.productsService.getOne(productId)
    .subscribe({
      next: (product) => {
        this.status = 'success';
        this.product = product;
      },
      error: () => {
        this.status = 'error';
        this.goToBack();
      }
    })
  }

  goToBack() {
    this.location.back();
  }

}
