import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

fdescribe('MapsService', () => {
  let service: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ MapsService ],
    });
    service = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for getCurrentPosition', () => {
    it('should save the center', () => {
      // Arrange
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successFn) => {
        const mockGeolocation = {
          coords: {
            accuracy: 0,
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
            latitude: -2,
            longitude: 79,
            speed: 0,
          },
          timestamp: 0,
        };
        successFn(mockGeolocation);
      });

      // Act
      service.getCurrentPosition();

      // Assert
      expect(service.center).toEqual({ lat: -2, lng: 79 });
    });
  });

});
