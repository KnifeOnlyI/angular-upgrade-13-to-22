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

    <app-dummy>
      <p>Dummy 1</p> <!-- Not displayed -->
    </app-dummy>

    <app-dummy displayMessage>
      <p>Dummy 2</p> <!-- Not displayed -->
    </app-dummy>

    <app-dummy [displayMessage]="false">
      <p>Dummy 3</p> <!-- Not displayed -->
    </app-dummy>

    <app-dummy [displayMessage]="true">
      <p>Dummy 4</p> <!-- Not displayed -->
    </app-dummy>
  `
})
export class ErrorPageComponent {

}
