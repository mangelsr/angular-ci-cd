import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRouteStub, getText, observableMock, asyncData } from 'src/testing';

import { ProductDetailComponent } from './product-detail.component';
import { generateOneProduct } from 'src/app/models/product.mock';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let route: ActivatedRouteStub;
  let productService: jasmine.SpyObj<ProductsService>;
  let location: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const routeStub = new ActivatedRouteStub();
    const productSpy = jasmine.createSpyObj('ProductsService', ['getOne']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: ProductsService, useValue: productSpy },
        { provide: Location, useValue: locationSpy },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);

    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;

    component = fixture.componentInstance;
  });

  it('should show create the component with correct param and product retreived successfully', () => {
    const productId = '1';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    };
    productService.getOne.and.returnValue(observableMock(productMock));

    fixture.detectChanges();  // ngOnInit
    expect(component).toBeTruthy();
  });

  it('should show the product in the view', () => {
    const productId = '2';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    };
    productService.getOne.and.returnValue(observableMock(productMock));

    fixture.detectChanges();  // ngOnInit

    const titleText = getText(fixture, 'title');
    const priceText = getText(fixture, 'price');

    expect(titleText).toBe(productMock.title);
    expect(priceText).toContain(productMock.price.toString());
    expect(productService.getOne).toHaveBeenCalledWith(productId);
  });

  it('should show return to the last page when no productId is provided', () => {
    route.setParamMap({});
    location.back.and.callThrough();

    fixture.detectChanges();  // ngOnInit

    expect(location.back).toHaveBeenCalled();
  });

  it('should change the status from "init" => "loading" => "success"', fakeAsync(() => {
    const productId = '3';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    };
    productService.getOne.and.returnValue(asyncData(productMock));

    expect(component.status).toBe('init');

    fixture.detectChanges(); // ngOnInit

    expect(component.status).toBe('loading');

    tick();
    fixture.detectChanges();

    expect(component.status).toBe('success');
  }));

  it('should type be "customer"', () => {
    const type = 'customer';
    route.setQueryParamMap({ type: type });

    const productId = '3';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    };
    productService.getOne.and.returnValue(observableMock(productMock));

    fixture.detectChanges();  // ngOnInit

    const typeText = getText(fixture, 'type');
    expect(component.type).toBe(type);
    expect(typeText).toContain(type);
  });
});
