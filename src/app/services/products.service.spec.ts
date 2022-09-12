import { TestBed } from '@angular/core/testing';
import { HttpStatusCode } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ProductsService ],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getAllSimple', () => {
    it('should return product list', (doneFn) => {
      // Arrange
      const mockData = generateManyProducts(5);

      // Act
      service.getAllSimple().subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // HTTP Config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

  });

  describe('tests for getAll', () => {
    it('should return product list', (doneFn) => {
      // Arrange
      const mockData = generateManyProducts(5);

      // Act
      service.getAll().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      // HTTP Config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should return product list with tax value', (doneFn) => {
      // Arrange
      const mockData = [
        {
          ...generateOneProduct(),
          price: 100,
        },
        {
          ...generateOneProduct(),
          price: 200,
        },
        {
          ...generateOneProduct(),
          price: 0,
        },
        {
          ...generateOneProduct(),
          price: -100,
        },
      ];

      // Act
      service.getAll().subscribe((data) => {
        // Assert
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });

      // HTTP Config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should send query params with limit 10 and offset 2', (doneFn) => {
      // Arrange
      const mockData = generateManyProducts(5);
      const limit = 10;
      const offset = 3;

      // Act
      service.getAll(limit, offset).subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      // HTTP Config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
    });

  });

  describe('tests for create', () => {
    it('should return a new product', (doneFn) => {
      // Arrange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'New Product',
        price: 100,
        images: ['img'],
        description: '...',
        categoryId: 12,
      };

      // Act
      service.create({...dto}).subscribe((data) => {
        // Asssert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // HTTP Config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('tests for update', () => {
    it('should update a product', (doneFn) => {
      // Arrange
      const productId = '1';
      const mockData = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'Updated Product',
        price: 100,
        images: ['img'],
        description: '...',
        categoryId: 12,
      };

      // Act
      service.update(productId, {...dto}).subscribe((data) => {
        // Asssert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // HTTP Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');
    });
  });


  describe('tests for delete', () => {
    it('should delete a product', (doneFn) => {
      // Arrange
      const mockResponse = true;
      const productId = '1';

      // Act
      service.delete(productId).subscribe((data) => {
        // Asssert
        expect(data).toBe(mockResponse);
        doneFn();
      });

      // HTTP Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockResponse);
    });
  });

  describe('tests for getOne', () => {
    it('should return a product', (doneFn) => {
      // Arrange
      const mockData = generateOneProduct();
      const productId = '1';

      // Act
      service.getOne(productId).subscribe((data) => {
        // Asssert
        expect(data).toBe(mockData);
        doneFn();
      });

      // HTTP Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    });

    it('should catch 404 error', (doneFn) => {
      // Arrange
      const productId = '1';
      const messageError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: messageError,
      };

      // Act
      service.getOne(productId).subscribe({
        error: (error) => {
          // Assert
          expect(error).toEqual('El producto no existe');
          doneFn();
        },
      });

      // HTTP Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(messageError, mockError);
    });

    it('should catch 409 error', (doneFn) => {
      // Arrange
      const productId = '1';
      const messageError = '409 message';
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: messageError,
      };

      // Act
      service.getOne(productId).subscribe({
        error: (error) => {
          // Assert
          expect(error).toEqual('Algo esta fallando en el server');
          doneFn();
        },
      });

      // HTTP Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(messageError, mockError);
    });

    it('should catch 401 error', (doneFn) => {
      // Arrange
      const productId = '1';
      const messageError = '401 message';
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: messageError,
      };

      // Act
      service.getOne(productId).subscribe({
        error: (error) => {
          // Assert
          expect(error).toEqual('No estas permitido');
          doneFn();
        },
      });

      // HTTP Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(messageError, mockError);
    });

    it('should catch default error', (doneFn) => {
      // Arrange
      const productId = '1';
      const messageError = '500 message';
      const mockError = {
        status: HttpStatusCode.InternalServerError,
        statusText: messageError,
      };

      // Act
      service.getOne(productId).subscribe({
        error: (error) => {
          // Assert
          expect(error).toEqual('Ups algo salio mal');
          doneFn();
        },
      });

      // HTTP Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(messageError, mockError);
    });
  });
});
