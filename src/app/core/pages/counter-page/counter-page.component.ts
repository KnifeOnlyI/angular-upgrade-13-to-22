import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CounterComponent} from "@shared/components/counter/counter.component";

@Component({
  selector: 'app-counter-page',
  standalone: true,
  imports: [
    CounterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Counter</h1>
    <app-counter [autoIncrementValue]="10" (counterChanges)="onCounterChanges($event)"></app-counter>
  `
})
export class CounterPageComponent {

  protected onCounterChanges(newCounterValue: number) {
    console.log('New counter value', newCounterValue);
  }
}
