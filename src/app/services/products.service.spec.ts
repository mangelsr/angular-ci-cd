import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

fdescribe('ProductsService', () => {
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getAllSimple', () => {
    it('should return product list', (doneFn) => {
      // Arrange
      const mockData: Product[] = [
        {
          id: '14',
          title: "Licensed Soft Chips",
          price: 861,
          description: "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
          category: {
            id: 2,
            name: "Electronics",
          },
          images: [
            "https://api.lorem.space/image/watch?w=640&h=480&r=6878",
            "https://api.lorem.space/image/watch?w=640&h=480&r=8385",
            "https://api.lorem.space/image/watch?w=640&h=480&r=9814"
          ]
        },
        {
          id: '15',
          title: "Generic Soft Tuna",
          price: 638,
          description: "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
          category: {
            id: 5,
            name: "Others",
          },
          images: [
            "https://api.lorem.space/image?w=640&h=480&r=2536",
            "https://api.lorem.space/image?w=640&h=480&r=9213",
            "https://api.lorem.space/image?w=640&h=480&r=3062"
          ]
        },
        {
          id: '16',
          title: "Rustic Wooden Chicken",
          price: 698,
          description: "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
          category: {
            id: 2,
            name: "Electronics",
          },
          images: [
            "https://api.lorem.space/image/watch?w=640&h=480&r=2639",
            "https://api.lorem.space/image/watch?w=640&h=480&r=8508",
            "https://api.lorem.space/image/watch?w=640&h=480&r=6071"
          ]
        },
        {
          id: '17',
          title: "Awesome Soft Salad",
          price: 416,
          description: "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
          category: {
            id: 1,
            name: "Clothes",
          },
          images: [
            "https://api.lorem.space/image/fashion?w=640&h=480&r=4536",
            "https://api.lorem.space/image/fashion?w=640&h=480&r=6275",
            "https://api.lorem.space/image/fashion?w=640&h=480&r=8668"
          ]
        },
        {
          id: '18',
          title: "Intelligent Wooden Chicken",
          price: 240,
          description: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
          category: {
            id: 5,
            name: "Others",
          },
          images: [
            "https://api.lorem.space/image?w=640&h=480&r=575",
            "https://api.lorem.space/image?w=640&h=480&r=8779",
            "https://api.lorem.space/image?w=640&h=480&r=2620"
          ]
        }
      ];

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
      httpController.verify();
    });

  });

});
