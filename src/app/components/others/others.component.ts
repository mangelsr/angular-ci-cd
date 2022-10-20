import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {

  color = 'blue';
  text = 'Guayaquil'
  products: Product[] = []

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit() {
    this.productsService.getAll()
      .subscribe(data => {
        this.products = data;
      });
  }

}
