import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { query, queryById } from './finders';

// Trigger angular events (click)
export function clickEvent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false,
  event: unknown = null,
) {
  let element: DebugElement;
  if (withTestId) {
    element = queryById(fixture, selector);
  } else {
    element = query(fixture, selector);
  }
  element.triggerEventHandler('click', event);
}


// Click on HTML element directly
export function clickElement<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false,
) {
  let debugElement: DebugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }
  (debugElement.nativeElement as HTMLElement).click();
}
