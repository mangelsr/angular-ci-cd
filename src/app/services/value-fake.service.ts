import { of } from 'rxjs';

export class FakeValueService {

  private value = 'FakeValue';

  constructor() { }

  getValue() {
    return this.value;
  }

  setValue(value: string) {
    this.value = value;
  }

  getPromiseValue() {
    return Promise.resolve('Fake Promise value');
  }

  getObservable() {
    return of('Kake Observable value');
  }

}
