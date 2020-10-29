import {Directive, ElementRef, isDevMode, Renderer2} from '@angular/core';
@Directive({
  selector: '[appCypressData]',
})
export class CypressDataDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    if (!isDevMode()) {
      renderer.removeAttribute(el.nativeElement, 'appCypressData');
    }
  }
}
