import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';

import { asyncData, asyncError, observableMock, promiseMock, queryById, getText, RouterLinkDirectiveStub } from 'src/testing';
import { ProductsService } from 'src/app/services/products.service';
import { ValueService } from 'src/app/services/value.service';
import { generateManyProducts } from 'src/app/models/product.mock';

describe('ProductsComponent', () => {
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
        RouterLinkDirectiveStub,
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
    productServiceSpy.getAll.and.returnValue(observableMock(productsMock));

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
      productServiceSpy.getAll.and.returnValue(observableMock(productsMock));

      component.getAllProducts();
      fixture.detectChanges();
      const productsDebug = fixture.debugElement.queryAll(By.css('app-product'));

      expect(component.products.length).toEqual(productsMock.length + initialCount);
      expect(productsDebug.length).toEqual(productsMock.length + initialCount);
    });

    it('should change state "loading" => "success"', fakeAsync(() => {
      const productsMock = generateManyProducts(3);
      productServiceSpy.getAll.and.returnValue(asyncData(productsMock));

      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');
      tick(); //excecutes obs, setTimeout, promise
      fixture.detectChanges();
      expect(component.status).toEqual('success');
    }));

    it('should change state "loading" => "error"', fakeAsync(() => {
      productServiceSpy.getAll.and.returnValue(asyncError('ERROR HAPPENS...'));

      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');
      tick(4000); //excecutes obs, setTimeout, promise
      fixture.detectChanges();
      expect(component.status).toEqual('error');
    }));

    it('should change state "loading" => "error"', fakeAsync(() => {
      const btnDebug = fixture.debugElement.query(By.css('button.btn-products'));
      productServiceSpy.getAll.and.returnValue(asyncError('ERROR HAPPENS...'));

      btnDebug.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect((btnDebug.nativeElement as HTMLElement).textContent).toEqual('Loading');

      tick(4000); //excecutes obs, setTimeout, promise
      fixture.detectChanges();

      expect((btnDebug.nativeElement as HTMLElement).textContent).toEqual('Error');
    }));

  });

  describe('tests for callPromise', () => {
    it('should call to promise', async () => {
      const mockMessage = 'Resolved value...';
      valueServiceSpy.getPromiseValue.and.returnValue(promiseMock(mockMessage));

      await component.callPromise();
      fixture.detectChanges();

      expect(component.promiseResponse).toBe(mockMessage);
      expect(valueServiceSpy.getPromiseValue).toHaveBeenCalled();
    });

    it('should show "Resolved value..." in <p> when btn was clicked', fakeAsync(() => {
      const mockMessage = 'Resolved value...';
      valueServiceSpy.getPromiseValue.and.returnValue(promiseMock(mockMessage));
      const btnDebug = queryById(fixture, 'btn-promise');

      btnDebug.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      const text = getText(fixture, 'response');

      expect(text).toBe(mockMessage);
    }));
  });

});
