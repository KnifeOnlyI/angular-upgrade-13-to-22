import {Component} from '@angular/core';

@Component({
  selector: 'app-root-page',
  template: `
    <h1>Pages :</h1>
    <ul>
      <li><a [routerLink]="['']">Index</a></li>
      <li><a [routerLink]="['counter']">Counter</a></li>
      <li><a [routerLink]="['form']">Form</a></li>
      <li><a [routerLink]="['error']">Error</a></li>
    </ul>

    <hr>

    <router-outlet></router-outlet>
  `
})
export class AppRootPageComponent {
}
