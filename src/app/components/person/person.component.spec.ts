import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PersonComponent } from './person.component';
import { Person } from '../../models/person.model';
import { clickEvent, getText } from '../../../testing';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the name should be "Miguel"', () => {
    component.person = new Person('Miguel', 'Sanchez', 25, 95, 1.8);
    expect(component.person?.name).toEqual('Miguel');
  });

  it('should have a <p> with "Mi heigth is {person.heigth}"', () => {
    component.person = new Person('Miguel', 'Sanchez', 25, 95, 1.8);
    const expectedMessage = 'Mi heigth is 1.8';
    const personDebug: DebugElement = fixture.debugElement; // Good Practice
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;

    fixture.detectChanges();

    expect(pElement?.textContent).toContain(component.person.heigth);
  });

  it('should have a <h3> with "Hello, {person.name}"', () => {
    // Arrange
    component.person = new Person('Miguel', 'Sanchez', 25, 95, 1.8);
    const expectedMessage = 'Hello, Miguel';

    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;

    // Act: Run change detection manually
    fixture.detectChanges();

    // Assert
    expect(h3Element?.textContent).toContain(expectedMessage);
  });

  it('should display a text with BMI when user call calcBMI', () => {
    component.person = new Person('Miguel', 'Sanchez', 25, 95, 1.8);
    const expectedMessage = 'BMI: overweigth 1';

    // Act: Run change detection manually
    component.calcBMI();
    fixture.detectChanges();

    // Assert
    expect(getText(fixture, 'bmi-calc')).toBe(expectedMessage);
  });

  it('should display a text with BMI when user clic the button', () => {
    component.person = new Person('Miguel', 'Sanchez', 25, 95, 1.8);
    const expectedMessage = 'BMI: overweigth 1';

    // Act: Run change detection manually
    clickEvent(fixture, 'bmi-calc', true);
    fixture.detectChanges();

    // Assert
    expect(getText(fixture, 'bmi-calc')).toBe(expectedMessage);
  });

  it('should raise selected event when click', () => {
    const expectedPerson = new Person('Miguel', 'Sanchez', 25, 95, 1.8);
    component.person = expectedPerson;

    let selectedPerson: Person | undefined;
    component.onselected.subscribe((data) => {
      selectedPerson = data;
    });

    // Act: Run change detection manually
    clickEvent(fixture, 'btn-choose', true);
    fixture.detectChanges();

    // Assert
    expect(selectedPerson).toBe(expectedPerson);
  });
});


@Component({
  template: '<app-person [person]="person" (onselected)="onselected($event)"></app-person>',

})
class HostComponent {
  person = new Person('Miguel', 'Sanchez', 25, 95, 1.8)
  selectedPerson: Person | undefined;

  onselected(person: Person) {
    this.selectedPerson = person;
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    const expectedName = component.person.name;
    const h3Debug: DebugElement = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;

    fixture.detectChanges();

    expect(h3Element.textContent).toContain(expectedName);
  });

  it('should raise selected event', () => {
    const btnDebug: DebugElement = fixture.debugElement.query(By.css('app-person .btn-choose'));

    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.selectedPerson).toEqual(component.person);
  });

});
