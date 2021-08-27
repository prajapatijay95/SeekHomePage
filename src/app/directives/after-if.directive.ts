import {
  AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
  NgModule,
  Output,
} from '@angular/core';

@Directive({ selector: '[after-if]' })
export class AfterIfDirective implements AfterContentInit {
  @Output('after-if')
  public after: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  constructor(private el: ElementRef) {}

  public ngAfterContentInit(): void {
    // timeout helps prevent unexpected change errors
    setTimeout(() => this.after.next(this.el));
  }
}

@NgModule({
  declarations: [AfterIfDirective],
  exports: [AfterIfDirective],
})
export class AfterIfModule {}
