import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GoogleMapsModule} from '@angular/google-maps';

import {RealtimeMapComponent} from './realtime-map.component';

@NgModule({
  imports: [
    CommonModule,
    GoogleMapsModule,
  ],
  declarations: [RealtimeMapComponent],
})
export class RealtimeMapModule {
}