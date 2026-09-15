import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'v1',
    pathMatch: 'full'
  },
  {
    path: 'v1',
    loadComponent: () =>
      import('./realtime-map/realtime-map.component').then(m => m.RealtimeMapComponent),
    title: 'v1: @angular/google-maps (Nativo)'
  },
  {
    path: 'v2',
    loadComponent: () =>
      import('./realtime-map-v2/realtime-map-v2.component').then(m => m.RealtimeMapV2Component),
    title: 'v2: Google Maps JavaScript API (Directa)'
  },
  {
    path: 'v3',
    loadComponent: () =>
      import('./realtime-map-v3/realtime-map-v3.component').then(m => m.RealtimeMapV3Component),
    title: 'v3: Signals & Reactive (@angular/google-maps)'
  },
  {
    path: '**',
    redirectTo: 'v1'
  }
];
