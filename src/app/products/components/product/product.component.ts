import { Component, Input } from '@angular/core';

import { generateOneProduct } from 'src/app/models/product.mock';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product = generateOneProduct();

  constructor() { }

}
