import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { App1AppComponent } from './app1-app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App1AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [App1AppComponent]
})
export class AppModule { }
