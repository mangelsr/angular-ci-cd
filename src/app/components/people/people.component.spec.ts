import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from '../../models/person.model';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent, PersonComponent, ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of app-person', () => {
    const expectedPeople = [
      new Person('Miguel', 'Sanchez', 25, 90, 1.8),
      new Person('Angie', 'Mendoza', 21, 62, 1.65),
      new Person('David', 'Sanchez', 16, 55, 1.78),
    ];
    component.people = expectedPeople;

    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));

    expect(debugElement.length).toEqual(expectedPeople.length);
  });


});
