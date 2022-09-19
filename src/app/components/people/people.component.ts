import { Component } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {

  person: Person = new Person(
    'Miguel', 'Sanchez', 25, 90, 1.8
  );
  people: Person[] = [
    new Person('Miguel', 'Sanchez', 25, 90, 1.8),
    new Person('Angie', 'Mendoza', 21, 62, 1.65),
  ];
  selectedPerson: Person | null = null;

  constructor() { }

  choosed(person: Person) {
    this.selectedPerson = person;
  }

}
