import { Component, Input } from '@angular/core';

import { generateOneProduct } from 'src/app/models/product.mock';
import { Product } from 'src/app/models/product.model';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    imports: [RouterLink, CurrencyPipe]
})
export class ProductComponent {
  @Input() product: Product = generateOneProduct();

  constructor() { }

}
