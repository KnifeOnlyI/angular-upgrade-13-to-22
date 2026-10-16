import {Component} from '@angular/core';
import {CounterComponent} from "@shared/components/counter/counter.component";

@Component({
  selector: 'app-index-page',
  standalone: true,
  template: `
    <h1>Index</h1>
    <app-counter [autoIncrementValue]="25"></app-counter>
  `,
  imports: [
    CounterComponent
  ]
})
export class IndexPageComponent {

}
