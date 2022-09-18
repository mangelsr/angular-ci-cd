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

  constructor() { }


}
