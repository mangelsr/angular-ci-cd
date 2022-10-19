import { TestBed } from "@angular/core/testing";
import { AuthGuard } from './auth.guard';
import { TokenService } from '../services/token.service';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { fakeActivatedRouteSnapshot, fakeParamMap, fakeRouterStateSnapshot, observableMock } from "src/testing";
import { generateOneUser } from "../models/user.mock";

fdescribe('Auth Guard', () => {
  let guard: AuthGuard;
  let tokenService: jasmine.SpyObj<TokenService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const tokenSpy = jasmine.createSpyObj('TokenService', ['getToken']);
    const authSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: TokenService, useValue: tokenSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });


  it('should be crated', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true with a session', (doneFn) => {
    const activatedRoute = fakeActivatedRouteSnapshot({
      // paramMap: fakeParamMap({
      //   idProduct: '1234',
      // }),
    });
    const routerState = fakeRouterStateSnapshot({});

    const mockedUser = generateOneUser();
    authService.getUser.and.returnValue(observableMock(mockedUser));

    guard.canActivate(activatedRoute, routerState)
      .subscribe(response => {
        expect(response).toBe(true);
        doneFn();
    });
  });

  it('should return false without a session', (doneFn) => {
    const activatedRoute = fakeActivatedRouteSnapshot({
      // paramMap: fakeParamMap({
      //   idProduct: '1234',
      // }),
    });
    const routerState = fakeRouterStateSnapshot({});

    authService.getUser.and.returnValue(observableMock(null));

    guard.canActivate(activatedRoute, routerState)
      .subscribe(response => {
        expect(response).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['/home']);
        doneFn();
    });
  });

  it('should return false with idProduct Param', (doneFn) => {
    const activatedRoute = fakeActivatedRouteSnapshot({
      // paramMap: fakeParamMap({
      //   idProduct: '1234',
      // }),
    });
    const routerState = fakeRouterStateSnapshot({});

    authService.getUser.and.returnValue(observableMock(null));

    guard.canActivate(activatedRoute, routerState)
      .subscribe(response => {
        expect(response).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['/home']);
        doneFn();
    });
  });
});
