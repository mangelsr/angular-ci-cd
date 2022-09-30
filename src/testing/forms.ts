import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { query, queryById } from './finders';


export function setInputValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: string,
  withTestId: boolean = false,
) {
  let debugElement: DebugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }
  const input: HTMLInputElement = debugElement.nativeElement;
  input.value = value;
  input.dispatchEvent(new Event('input'));
  input.dispatchEvent(new Event('blur'));
}

export function setCheckValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  checked: boolean,
  withTestId: boolean = false,
) {
  let debugElement: DebugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }
  const input: HTMLInputElement = debugElement.nativeElement;
  input.checked = checked;
  input.dispatchEvent(new Event('change'));
  input.dispatchEvent(new Event('blur'));
}
