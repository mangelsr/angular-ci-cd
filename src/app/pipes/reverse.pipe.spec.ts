import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ReversePipe } from './reverse.pipe';

@Component({
  template: `
    <h5>{{ 'text' | reverse }}</h5>
    <input [(ngModel)]="text">
    <p>{{ text | reverse }}</p>
  `,
})
class HostComponent {
  text = '';
}

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const response = pipe.transform('roma');
    expect(response).toBe('amor');
  });

  it('should transform "123" to "321"', () => {
    const pipe = new ReversePipe();
    const response = pipe.transform('123');
    expect(response).toBe('321');
  });
});

describe('ReversePipe from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ HostComponent, ReversePipe ]
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

  it('should the <h5> be "txet"', () => {
    const h5Debug = fixture.debugElement.query(By.css('h5'));
    expect((h5Debug.nativeElement as HTMLElement).textContent).toBe('txet');
  });

  it('should apply reverse pipe when typing on the input', () => {
    const pDebug = fixture.debugElement.query(By.css('p'));
    const inputDebug = fixture.debugElement.query(By.css('input'));
    const inputElement: HTMLInputElement = inputDebug.nativeElement;

    expect((pDebug.nativeElement as HTMLElement).textContent).toBe('');

    inputElement.value = '123';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect((pDebug.nativeElement as HTMLElement).textContent).toBe('321');
  });
});
