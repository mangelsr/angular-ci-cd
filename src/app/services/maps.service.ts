import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  center = { lat: 0, lng: 0 };

  constructor() { }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((reposnse) => {
      const { latitude, longitude } = reposnse.coords;
      this.center = { lat: latitude, lng: longitude };
    });
  }
}
