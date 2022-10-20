/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Router, RouterLinkWithHref } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { clickElement, query, queryAllByDirective } from "src/testing";
import { AppComponent } from "./app.component";


@Component({
  selector: 'app-pico-preview',
})
class PicoPreviewComponentStud {}

@Component({
  selector: 'app-people',
})
class PeopleComponentStud {}

@Component({
  selector: 'app-others',
})
class OthersComponentStud {}


const routes = [
  { path: 'pico-preview', component: PicoPreviewComponentStud },
  { path: 'people', component: PeopleComponentStud },
  { path: 'others', component: OthersComponentStud },
];


fdescribe('App Integratioin Test', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [
        AppComponent,
        PicoPreviewComponentStud,
        PeopleComponentStud,
        OthersComponentStud,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
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
    fixture.detectChanges();
    expect(router.url).toEqual('/others');
    const element = query(fixture, 'app-others');
    expect(element).toBeTruthy();
  }));

});
