/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Router, RouterLinkWithHref } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { asyncData, clickElement, getText, observableMock, query, queryAllByDirective } from "src/testing";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";
import { routes } from "./app-routing.module";
import { ProductsService } from './services/products.service';
import { generateManyProducts } from "./models/product.mock";
import { AuthService } from "./services/auth.service";
import { generateOneUser } from "./models/user.mock";

// NOTE:
// INTEGRATION TESTS DON'T SUPPORT LAZY LOADED MODULES...


// Example with Duplicated routes and using stud components
// @Component({
//   selector: 'app-pico-preview',
// })
// class PicoPreviewComponentStud {}

// @Component({
//   selector: 'app-people',
// })
// class PeopleComponentStud {}

// @Component({
//   selector: 'app-others',
// })
// class OthersComponentStud {}

// const routes = [
//   { path: 'pico-preview', component: PicoPreviewComponentStud },
//   { path: 'people', component: PeopleComponentStud },
//   { path: 'others', component: OthersComponentStud },
// ];


fdescribe('App Integratioin Test', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let productsService: jasmine.SpyObj<ProductsService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);

    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        // Important order, RouterTestingModule need to override whats on AppModule
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
      // schemas: [
      //   NO_ERRORS_SCHEMA,
      // ],
    }).compileComponents();
  });

  beforeEach( fakeAsync (() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Providers
    router = TestBed.inject(Router);
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    router.initialNavigation();
    tick(); // Wait until navigation end
    fixture.detectChanges();
  }));

  it('should render the parent component', () => {
    expect(component).toBeTruthy();
  });

  it('should render 7 routerLinks on the navbar', () => {
    const links = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(links.length).toEqual(7);
  });

  it('should render OthersComponent when clicked with a session', fakeAsync(() => {
    const mockedProducts = generateManyProducts(10);
    productsService.getAll.and.returnValue(asyncData(mockedProducts));

    const mockedUser = generateOneUser();
    authService.getUser.and.returnValue(observableMock(mockedUser));

    clickElement(fixture, 'others-link', true);
    tick(); // Wait until navigation end

    expect(router.url).toEqual('/others');
    const element = query(fixture, 'app-others');
    expect(element).toBeTruthy();

    fixture.detectChanges(); // OthersComponent ngOnInit
    expect(productsService.getAll).toHaveBeenCalledTimes(1);

    tick(); // Resolves productsService.getAll() execution
    fixture.detectChanges();

    const text = getText(fixture, 'products-length');
    expect(text).toContain(mockedProducts.length);
  }));

  it('should render OthersComponent when clicked without a session', fakeAsync(() => {
    authService.getUser.and.returnValue(observableMock(null));

    clickElement(fixture, 'others-link', true);
    tick(); // Wait until navigation end

    expect(router.url).toEqual('/');
  }));

  it('should render PicoComponent when clicked', fakeAsync(() => {
    clickElement(fixture, 'pico-link', true);
    tick(); // Wait until navigation end
    fixture.detectChanges(); // PicoPreviewComponent ngOnInit
    expect(router.url).toEqual('/pico-preview');
    const element = query(fixture, 'app-pico-preview');
    expect(element).toBeTruthy();
  }));

});
