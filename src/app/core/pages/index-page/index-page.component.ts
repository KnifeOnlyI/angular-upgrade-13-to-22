import {Component} from '@angular/core';
import {CounterComponent} from "@shared/components/counter/counter.component";

@Component({
  standalone: true,
  template: `
    <h1>Index</h1>
    <app-counter></app-counter>
  `,
  imports: [
    CounterComponent
  ]
})
export class IndexPageComponent {

}
