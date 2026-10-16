import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexPageComponent} from './index-page.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "@shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: IndexPageComponent
  }
];

@NgModule({
  declarations: [
    IndexPageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class IndexPageModule {
}
