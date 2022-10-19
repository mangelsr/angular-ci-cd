import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { RouterLinkDirectiveStub, queryAllByDirective } from '../testing/';

// OPT2: Use bare studs
@Component({
  selector: 'app-banner',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class BannerComponentStud {}

@Component({
  selector: 'app-footer',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class FooterComponentStud {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub,
        BannerComponentStud,
        FooterComponentStud,
      ],
      // OPT1: Omit error schema
      // schemas: [
      //   NO_ERRORS_SCHEMA,
      // ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'ng-testing-services'`, () => {
    expect(component.title).toEqual('ng-testing-services');
  });

  it('should render 7 routerLinks on the navbar', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    expect(links.length).toEqual(7);
  });

  it('should render 7 routerLinks that match the routes', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    const routerLinks = links.map(link => link.injector.get(RouterLinkDirectiveStub));
    expect(routerLinks[0].linkParams).toEqual('/');
    expect(routerLinks[1].linkParams).toEqual('/auth/register');
  });
});
