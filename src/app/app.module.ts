import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RealtimeMapModule } from './realtime-map/realtime-map.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RealtimeMapV2Component } from './realtime-map-v2/realtime-map-v2.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    RealtimeMapV2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RealtimeMapModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
