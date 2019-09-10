import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';
import { LogsrvService } from './logsrv.service';

@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [LogsrvService],
  bootstrap: [AppComponent]
})
export class AppModule { }
