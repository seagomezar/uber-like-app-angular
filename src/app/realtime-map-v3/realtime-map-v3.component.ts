import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { Subscription } from 'rxjs';
import { map_styles } from '../realtime-map-v2/map_styles';
import { DriverService, LocationCoord } from '../services/driver.service';

@Component({
  selector: 'app-realtime-map-v3',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './realtime-map-v3.component.html',
  styleUrls: ['./realtime-map-v3.component.scss']
})
export class RealtimeMapV3Component implements OnInit, OnDestroy {
  // Estado reactivo administrado mediante Angular Signals
  readonly userLocation = signal<LocationCoord>({ lat: 6.208488, lng: -75.563577 });
  readonly driverLocation = signal<LocationCoord | null>(null);
  readonly routeWaypoints = signal<LocationCoord[]>([]);
  readonly tripStatus = signal<string>('Esperando destino');
  readonly isTripActive = computed(() => this.driverLocation() !== null);

  readonly mapCenter = computed(() => this.userLocation());
  readonly zoomLevel = signal(15);

  readonly mapOptions: google.maps.MapOptions = {
    styles: map_styles,
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false
  };

  readonly userMarkerOptions: google.maps.MarkerOptions = {
    icon: { url: 'assets/photo.jpg' },
    title: 'Mi Ubicación'
  };

  readonly driverMarkerOptions: google.maps.MarkerOptions = {
    icon: { url: 'assets/car.png' },
    title: 'Conductor Uber'
  };

  readonly polylineOptions: google.maps.PolylineOptions = {
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 4,
    geodesic: true
  };

  private driverSub?: Subscription;

  constructor(private driverService: DriverService) {}

  ngOnInit() {
    this.detectLocation();
  }

  ngOnDestroy() {
    this.driverSub?.unsubscribe();
    this.driverService.stopSimulation();
  }

  detectLocation() {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.userLocation.set({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        () => {
          this.userLocation.set({ lat: 6.208488, lng: -75.563577 });
        }
      );
    }
  }

  async requestTo(destination: string) {
    this.tripStatus.set(`Buscando conductor a ${destination}...`);
    const trip = await this.driverService.requestDriver(destination, this.userLocation());

    this.routeWaypoints.set([
      trip.initialPosition,
      trip.endPosition
    ]);

    this.driverSub?.unsubscribe();
    this.driverSub = this.driverService.getDriverPosition$(trip.driverId).subscribe(pos => {
      if (pos) {
        this.driverLocation.set(pos);
        this.tripStatus.set(`Conductor en trayecto (${destination})`);
      }
    });
  }
}
