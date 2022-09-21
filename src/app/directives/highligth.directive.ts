import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighligth]'
})
export class HighligthDirective implements OnChanges {

  @Input() appHighligth = '';
  defultColor = 'gray';

  constructor(
    private element: ElementRef,
  ) {
    this.element.nativeElement.style.backgroundColor = this.defultColor;
  }

  ngOnChanges(): void {
    this.element.nativeElement.style.backgroundColor = this.appHighligth || this.defultColor;
  }

}
