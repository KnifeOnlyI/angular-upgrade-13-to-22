import {ChangeDetectionStrategy, Component, OnDestroy, signal} from '@angular/core';
import {DummyComponent} from "@shared/components/dummy/dummy.component";

@Component({
    selector: 'app-error-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
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

    <app-dummy [displayMessage]="displayLastDummy()">
      <p>Dummy 4</p> <!-- Not displayed -->
    </app-dummy>
  `
})
export class ErrorPageComponent implements OnDestroy {
  private readonly intervalId?: number | NodeJS.Timeout;

  // Obligé de passer à un signal suite au passage à zoneless. Sans signaux, zoneless ne détecte pas les changements
  // des inputs.
  protected displayLastDummy = signal(true);

  constructor() {
    this.intervalId = setInterval(() => {
      this.displayLastDummy.update(initial => !initial);
    }, 500);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
