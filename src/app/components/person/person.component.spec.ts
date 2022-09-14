import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PersonComponent } from './person.component';
import { Person } from '../../models/person.model';

fdescribe('PersonComponent', () => {
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
});
