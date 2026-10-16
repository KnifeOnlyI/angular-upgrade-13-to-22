import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject, map} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <p>Compteur : {{ counter | async }}</p>
    <p>Compteur (double) : {{ counterDouble | async }}</p>

    <button (click)="increment(100)">Incrémenter 100</button>
    <button (click)="decrement(100)">Décrémenter 100</button>
  `,
  imports: [
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {

  protected counter = new BehaviorSubject(0);
  protected counterDouble = this.counter.pipe(
    map((value) => value * 2)
  );

  constructor() {
    console.log('Counter component created');

    this.counter.pipe(
      // S'assure que la souscription est annulée lorsque le composant est détruit
      takeUntilDestroyed()
    ).subscribe((value) => {
      console.log('Counter value changed', value);
    });

    setInterval(() => this.increment(1), 500);
  }

  increment(value: number) {
    this.counter.next(this.counter.value + value);
  }

  decrement(value: number) {
    this.counter.next(this.counter.value - value);
  }
}
