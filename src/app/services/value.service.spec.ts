import { TestBed } from "@angular/core/testing";
import { firstValueFrom } from 'rxjs';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ValueService ],
    });
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getValue', () => {
    it('should be the default value', () => {
      expect(service.getValue()).toBe('MyValue');
    })
  });

  describe('tests for setValue', () => {
    it('should be the setted value', () => {
      expect(service.getValue()).toBe('MyValue');
      const newValue = 'NEW VALUE';
      service.setValue(newValue);
      expect(service.getValue()).toBe(newValue);
    })
  });

  describe('tests for getPromiseValue', () => {
    it('should return "Promise value" form promise then', (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('Promise value');
        doneFn();
      });
    });

    it('should return "Promise value" form promise async/await', async () => {
      const value = await service.getPromiseValue();
      expect(value).toBe('Promise value');
    });
  });

  describe('tests for getObservable', () => {
    it('should subscribe to observable value', (doneFn) => {
      service.getObservable().subscribe((value) => {
        expect(value).toBe('Observable value');
        doneFn();
      });
    })

    it('should subscribe to observable value async/await', async () => {
      const value = await firstValueFrom(service.getObservable());
      expect(value).toBe('Observable value');
    })
  });

});
