import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <p>Compteur : {{ counter }}</p>
    <p>Compteur (double) : {{ counterDouble }}</p>

    <button (click)="increment(100)">Incrémenter 100</button>
    <button (click)="decrement(100)">Décrémenter 100</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {

  private readonly cdr = inject(ChangeDetectorRef);

  protected counter = 0;
  protected counterDouble = 0;

  constructor() {
    console.log('Counter component created');

    setInterval(() => {
      this.increment(1)
      this.cdr.markForCheck();
    }, 500)
  }

  increment(value: number) {
    this.counter += value;
    this.counterDouble = this.counter * 2;
  }

  decrement(value: number) {
    this.counter -= value;
    this.counterDouble = this.counter * 2;
  }
}
