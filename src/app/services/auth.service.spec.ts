import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { Auth } from '../models/auth.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        AuthService,
        TokenService,
      ],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for login', () => {
    it('should return a token', (doneFn) => {
      // Arrange
      const mockData: Auth = { access_token: '123' };
      const email = 'mangelsr25@gmail.com';
      const pass = 'admin';

      // Act
      service.login(email, pass).subscribe((data) => {
        // Asssert
        expect(data).toBe(mockData);
        doneFn();
      });

      // HTTP Config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(mockData);
    });

    it('should call saveToken', (doneFn) => {
      // Arrange
      const mockData: Auth = { access_token: '123' };
      const email = 'mangelsr25@gmail.com';
      const pass = 'admin';
      spyOn(tokenService, 'saveToken').and.callThrough();

      // Act
      service.login(email, pass).subscribe((data) => {
        // Asssert
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith(mockData.access_token);
        doneFn();
      });

      // HTTP Config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(mockData);
    });
  });
});
