import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <p>Compteur : {{ counter }}</p>

    <button (click)="increment(100)">Incrémenter 100</button>
    <button (click)="decrement(100)">Décrémenter 100</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {

  counter = 0;

  constructor(private readonly cdr: ChangeDetectorRef) {
    console.log('Counter component created');

    setInterval(() => {
      this.increment(1)
      this.cdr.markForCheck();
    }, 500)
  }

  increment(value: number) {
    this.counter += value;
  }

  decrement(value: number) {
    this.counter -= value;
  }
}
