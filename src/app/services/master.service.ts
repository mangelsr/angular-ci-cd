import { Injectable, inject } from '@angular/core';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private valueService = inject(ValueService);


  getValue() {
    return this.valueService.getValue();
  }
}
