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

fdescribe('ReversePipe', () => {
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
