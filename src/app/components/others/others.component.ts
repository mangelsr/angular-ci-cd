import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { HighligthDirective } from '../../directives/highligth.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReversePipe } from '../../pipes/reverse.pipe';

@Component({
    selector: 'app-others',
    templateUrl: './others.component.html',
    styleUrls: ['./others.component.scss'],
    imports: [HighligthDirective, ReactiveFormsModule, FormsModule, ReversePipe]
})
export class OthersComponent implements OnInit {
  private productsService = inject(ProductsService);


  color = 'blue';
  text = 'Guayaquil'
  products: Product[] = []

  ngOnInit() {
    this.productsService.getAll()
      .subscribe(data => {
        this.products = data;
      });
  }

}
