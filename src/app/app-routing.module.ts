import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RealtimeMapComponent } from './realtime-map/realtime-map.component';
import { RealtimeMapV2Component } from './realtime-map-v2/realtime-map-v2.component';

const routes: Routes = [
  {path: '', component: RealtimeMapV2Component},
  {path: 'v1', component: RealtimeMapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
