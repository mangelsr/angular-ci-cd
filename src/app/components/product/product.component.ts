import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { generateOneProduct } from '../../models/product.mock';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product = generateOneProduct();

  constructor() { }

}
