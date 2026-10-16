import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorPageComponent} from './error-page.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "@shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: ErrorPageComponent
  }
];

@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class ErrorPageModule {
}
