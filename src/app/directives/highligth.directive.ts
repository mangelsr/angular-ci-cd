import { Directive, ElementRef, Input, OnChanges, inject } from '@angular/core';

@Directive({ selector: '[appHighligth]' })
export class HighligthDirective implements OnChanges {
  private element = inject(ElementRef);


  @Input() appHighligth = '';
  defultColor = 'gray';

  constructor() {
    this.element.nativeElement.style.backgroundColor = this.defultColor;
  }

  ngOnChanges(): void {
    this.element.nativeElement.style.backgroundColor = this.appHighligth || this.defultColor;
  }

}
