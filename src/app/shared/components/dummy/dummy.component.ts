import {booleanAttribute, ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-dummy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (displayMessage) {
      <ng-content></ng-content>
    }
  `,
})
export class DummyComponent {
  @Input({transform: booleanAttribute})
  displayMessage = false;

  constructor() {
    console.debug('Dummy component created');
  }
}
