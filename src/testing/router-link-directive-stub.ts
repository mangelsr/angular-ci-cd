import { Directive, HostListener, Input } from "@angular/core";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[routerLink]',
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: unknown;
  navigatedTo: unknown | null = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
