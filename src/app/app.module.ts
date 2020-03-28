import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RealtimeMapModule } from './realtime-map/realtime-map.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RealtimeMapV2Component } from './realtime-map-v2/realtime-map-v2.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RealtimeMapV3Component } from './realtime-map-v3/realtime-map-v3.component';
import { AgmCoreModule } from "@agm/core";

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    RealtimeMapV2Component,
    BottomBarComponent,
    RealtimeMapV3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RealtimeMapModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
