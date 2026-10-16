import {ChangeDetectionStrategy, Component, computed, effect, signal} from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <p>Compteur : {{ counter() }}</p>
    <p>Compteur (double) : {{ counterDouble() }}</p>

    <button (click)="increment(100)">Incrémenter 100</button>
    <button (click)="decrement(100)">Décrémenter 100</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {

  protected readonly counter = signal(0);
  protected readonly counterDouble = computed(() => this.counter() * 2);

  constructor() {
    console.log('Counter component created');

    effect(() => {
      console.log('Counter value changed', this.counter());
    });

    setInterval(() => this.increment(1), 500);
  }

  increment(value: number) {
    this.counter.update(initialValue => initialValue + value);
  }

  decrement(value: number) {
    this.counter.update(initialValue => initialValue - value);
  }
}
