import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent  {

  @Input() person?: Person;
  @Output() onselected = new EventEmitter<Person>();
  bmi = '';

  constructor() { }

  calcBMI() {
    this.bmi = this.person!.BMICalc();
  }

  onClick() {
    this.onselected.emit(this.person);
  }

}
