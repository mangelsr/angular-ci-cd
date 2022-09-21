import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, defer } from 'rxjs';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../../services/products.service';
import { ValueService } from '../../services/value.service';
import { generateManyProducts } from '../../models/product.mock';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductsService>
  let valueServiceSpy: jasmine.SpyObj<ValueService>

  beforeEach(async () => {
    const productSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const valueSpy = jasmine.createSpyObj('ValueService', ['getPromiseValue']);

    await TestBed.configureTestingModule({
      declarations: [
        ProductsComponent,
        ProductComponent,
      ],
      providers: [
        { provide: ProductsService, useValue: productSpy },
        { provide: ValueService, useValue: valueSpy },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    // MOCK PRODUCT SERVICE
    productServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;

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

    it('should change state "loading" => "success"', fakeAsync(() => {
      const productsMock = generateManyProducts(3);
      productServiceSpy.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));

      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');
      tick(); //excecutes obs, setTimeout, promise
      fixture.detectChanges();
      expect(component.status).toEqual('success');
    }));

    it('should change state "loading" => "error"', fakeAsync(() => {
      productServiceSpy.getAll.and.returnValue(defer(() => Promise.reject('ERROR HAPPENS...')));

      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');
      tick(4000); //excecutes obs, setTimeout, promise
      fixture.detectChanges();
      expect(component.status).toEqual('error');
    }));

  });

  describe('tests for callPromise', () => {
    it('should call to promise', async () => {
      const mockMessage = 'Resolved value...';
      valueServiceSpy.getPromiseValue.and.returnValue(Promise.resolve(mockMessage));

      await component.callPromise();
      fixture.detectChanges();

      expect(component.promiseResponse).toBe(mockMessage);
      expect(valueServiceSpy.getPromiseValue).toHaveBeenCalled();
    });
  });

});
