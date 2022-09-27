import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { HighligthDirective } from './highligth.directive';
import { query, queryAll, queryAllByDirective } from '../../testing';

@Component({
  template: `
    <h5 class="title" appHighligth>Some value</h5>
    <h5 appHighligth="green">Some value</h5>
    <p appHighligth>Paragraph</p>
    <p>Another paragraph</p>
    <input [(ngModel)]="color" [appHighligth]="color" />
  `,
})
class HostComponent {
  color = 'red';
}

describe('appHighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ HostComponent, HighligthDirective ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have three highligted elements and one not highligted', () => {
    const elements = queryAllByDirective(fixture, HighligthDirective);
    expect(elements.length).toBe(4);

    const elementsWithout = queryAll(fixture, '*:not([appHighligth])');
    expect(elementsWithout.length).toBe(2);
  });

  it('should match bgColor', () => {
    const elements = queryAllByDirective(fixture, HighligthDirective);
    expect((elements[0].nativeElement as HTMLElement).style.backgroundColor).toBe('gray');
    expect((elements[1].nativeElement as HTMLElement).style.backgroundColor).toBe('green');
    expect((elements[2].nativeElement as HTMLElement).style.backgroundColor).toBe('gray');
  });

  it('should match h5.title be default color', () => {
    const element = query(fixture, 'h5.title');
    const directive = element.injector.get(HighligthDirective);
    expect((element.nativeElement as HTMLElement).style.backgroundColor).toBe(directive.defultColor);
  });

  it('should bind <input> and change the bgColor', () => {
    const inputDebug = query(fixture, 'input');
    const inputElement: HTMLInputElement = inputDebug.nativeElement;

    expect(inputElement.style.backgroundColor).toBe('red');

    inputElement.value = 'green';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.style.backgroundColor).toBe('green');
    expect(component.color).toBe('green');
  });

});
