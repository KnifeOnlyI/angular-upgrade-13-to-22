import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@pages/index-page/index-page.module').then(m => m.IndexPageModule)
  },
  {
    path: 'counter',
    loadChildren: () => import('@pages/counter-page/counter-page.module').then(m => m.CounterPageModule)
  },
  {
    path: 'form',
    loadChildren: () => import('@pages/form-page/form-page.module').then(m => m.FormPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('@pages/error-page/error-page.module').then(m => m.ErrorPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
