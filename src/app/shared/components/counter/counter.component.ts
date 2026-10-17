import {ChangeDetectionStrategy, Component, computed, effect, Input, OnDestroy, OnInit, signal} from '@angular/core';

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
export class CounterComponent implements OnInit, OnDestroy {

  @Input({required: true})
  public autoIncrementValue!: number;

  protected readonly counter = signal(0);
  protected readonly counterDouble = computed(() => this.counter() * 2);
  private intervalId?: number | NodeJS.Timeout;

  constructor() {
    console.log('Counter component created');

    effect(() => {
      console.log('Counter value changed', this.counter());
    });
  }

  ngOnInit() {
    // La valeur des inputs ne sont dispo qu'à partir de ngOnInit
    this.intervalId = setInterval(() => this.increment(this.autoIncrementValue), 500);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  increment(value: number) {
    this.counter.update(initialValue => initialValue + value);
  }

  decrement(value: number) {
    this.counter.update(initialValue => initialValue - value);
  }
}
