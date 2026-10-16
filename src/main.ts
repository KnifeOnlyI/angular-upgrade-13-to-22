import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import {bootstrapApplication} from "@angular/platform-browser";
import {AppRootPageComponent} from "@pages/app-root-page/app-root-page.component";
import {provideRouter, Routes} from "@angular/router";

if (environment.production) {
  enableProdMode();
}

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@pages/index-page').then(m => m.routes),
  },
  {
    path: 'counter',
    loadChildren: () => import('@pages/counter-page').then(m => m.routes)
  },
  {
    path: 'form',
    loadChildren: () => import('@pages/form-page').then(m => m.routes)
  },
  {
    path: '**',
    loadChildren: () => import('@pages/error-page').then(m => m.routes)
  }
];

void bootstrapApplication(AppRootPageComponent, {providers: [provideRouter(routes)]});
