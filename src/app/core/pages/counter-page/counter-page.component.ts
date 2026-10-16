import {Component} from '@angular/core';
import {CounterComponent} from "@shared/components/counter/counter.component";

@Component({
  standalone: true,
  imports: [
    CounterComponent
  ],
  template: `
    <h1>Counter</h1>
    <app-counter></app-counter>
  `
})
export class CounterPageComponent {

}
