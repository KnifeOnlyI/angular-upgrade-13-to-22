import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from "@config/app-routing.module";
import {AppRootPageComponent} from "@pages/app-root-page/app-root-page.component";

@NgModule({
  declarations: [
    AppRootPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppRootPageComponent]
})
export class AppModule { }
