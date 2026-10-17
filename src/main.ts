import {enableProdMode, provideExperimentalZonelessChangeDetection} from '@angular/core';
import {environment} from './environments/environment';
import {bootstrapApplication} from "@angular/platform-browser";
import {AppRootPageComponent} from "@pages/app-root-page/app-root-page.component";
import {provideRouter, Routes} from "@angular/router";
import {provideHttpClient, withFetch} from "@angular/common/http";

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
    path: 'search-form',
    loadChildren: () => import('@pages/search-form-page').then(m => m.routes)
  },
  {
    path: '**',
    loadChildren: () => import('@pages/error-page').then(m => m.routes)
  }
];

void bootstrapApplication(AppRootPageComponent, {
  providers: [
    provideRouter(routes),
    // On provide HttpClient (obligatoire pour le moment si on fait des requêtes HTTP)
    // Et on demande à ce qu'il utilise fetch au lieu de XHR.
    provideHttpClient(withFetch()),
    provideExperimentalZonelessChangeDetection()
  ]
});
