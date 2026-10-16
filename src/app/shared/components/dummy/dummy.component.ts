import {Component} from '@angular/core';

@Component({
  selector: 'app-dummy',
  standalone: true,
  template: ``
})
export class DummyComponent {
  constructor() {
    console.debug('Dummy component created');
  }
}
