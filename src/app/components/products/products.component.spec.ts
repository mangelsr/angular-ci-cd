import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../../services/products.service';
import { generateManyProducts } from '../../models/product.mock';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductsService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductsService', ['getAll']);
    await TestBed.configureTestingModule({
      declarations: [
        ProductsComponent,
        ProductComponent,
      ],
      providers: [
        { provide: ProductsService, useValue: spy },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    // MOCK PRODUCT SERVICE
    productServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    const productsMock = generateManyProducts(3);
    productServiceSpy.getAll.and.returnValue(of(productsMock));

    fixture.detectChanges(); // ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productServiceSpy.getAll).toHaveBeenCalled();
  });

  describe('tests for getAllProducts', () => {
    it('should return product list from service and render', () => {
      const initialCount = component.products.length;
      const productsMock = generateManyProducts(3);
      productServiceSpy.getAll.and.returnValue(of(productsMock));

      component.getAllProducts();
      fixture.detectChanges();
      const productsDebug = fixture.debugElement.queryAll(By.css('app-product'));

      expect(component.products.length).toEqual(productsMock.length + initialCount);
      expect(productsDebug.length).toEqual(productsMock.length + initialCount);
    });
  });
});
