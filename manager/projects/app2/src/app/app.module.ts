import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { App2AppComponent } from './app2-app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App2AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [App2AppComponent]
})
export class AppModule { }
