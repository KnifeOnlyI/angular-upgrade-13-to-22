import {Component} from '@angular/core';
import {DummyComponent} from "@shared/components/dummy/dummy.component";

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [
    DummyComponent
  ],
  template: `
    <h1>Page not found</h1>
    <app-dummy></app-dummy>
  `
})
export class ErrorPageComponent {

}
