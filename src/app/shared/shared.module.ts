import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CounterComponent} from "@shared/components/counter/counter.component";
import { DummyComponent } from '@shared/components/dummy/dummy.component';


@NgModule({
  declarations: [
    CounterComponent,
    DummyComponent
  ],
  exports: [
    CounterComponent,
    DummyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
