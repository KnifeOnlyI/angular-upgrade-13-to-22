import {booleanAttribute, ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'app-dummy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (displayMessage()) {
      <ng-content></ng-content>
    }
  `,
})
export class DummyComponent {
  // Pas obligé de passer à un input signal mais c'est plus propre, surtout quand zoneless est activé.
  displayMessage = input(false, {transform: booleanAttribute});

  constructor() {
    console.debug('Dummy component created');
  }
}
