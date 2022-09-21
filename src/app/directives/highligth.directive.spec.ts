import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HighligthDirective } from './highligth.directive';

@Component({
  template: `
    <h5 class="title" appHighligth>Some value</h5>
    <h5 appHighligth="green">Some value</h5>
    <p appHighligth>Paragraph</p>
    <p>Another paragraph</p>
  `,

})
class HostComponent {}

fdescribe('appHighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    expect(elements.length).toBe(3);

    const elementsWithout = fixture.debugElement.queryAll(By.css('*:not([appHighligth])'));
    expect(elementsWithout.length).toBe(1);
  });

  it('should match bgColor', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    expect((elements[0].nativeElement as HTMLElement).style.backgroundColor).toBe('gray');
    expect((elements[1].nativeElement as HTMLElement).style.backgroundColor).toBe('green');
    expect((elements[2].nativeElement as HTMLElement).style.backgroundColor).toBe('gray');
  });

  it('should match h5.title be default color', () => {
    const element = fixture.debugElement.query(By.css('h5.title'));
    const directive = element.injector.get(HighligthDirective);

    expect((element.nativeElement as HTMLElement).style.backgroundColor).toBe(directive.defultColor);
  });
});
