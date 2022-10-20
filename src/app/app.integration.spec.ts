/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Router, RouterLinkWithHref } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { clickElement, query, queryAllByDirective } from "src/testing";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";
import { routes } from "./app-routing.module";

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        // Important order, RouterTestingModule need to override whats on AppModule
        RouterTestingModule.withRoutes(routes),
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

  it('should render OthersComponent when clicked', fakeAsync(() => {
    clickElement(fixture, 'others-link', true);
    tick(); // Wait until navigation end
    fixture.detectChanges(); // OthersComponent ngOnInit
    expect(router.url).toEqual('/others');
    const element = query(fixture, 'app-others');
    expect(element).toBeTruthy();
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
