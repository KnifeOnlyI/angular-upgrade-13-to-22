import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "@shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CounterPageComponent} from "@pages/counter-page/counter-page.component";

const routes: Routes = [
  {
    path: '',
    component: CounterPageComponent
  }
];

@NgModule({
  declarations: [
    CounterPageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class CounterPageModule {
}
