import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighligh]'
})
export class HighligthDirective implements OnChanges {

  @Input() appHighligh = '';
  defultColor = 'gray';

  constructor(
    private element: ElementRef,
  ) {
    this.element.nativeElement.style.backgroundColor = this.defultColor;
  }

  ngOnChanges(): void {
    this.element.nativeElement.style.backgroundColor = this.appHighligh || this.defultColor;
  }

}
