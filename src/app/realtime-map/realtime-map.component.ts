import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { Subscription } from 'rxjs';
import { map_styles } from '../realtime-map-v2/map_styles';
import { DriverService } from '../services/driver.service';

@Component({
  selector: 'app-realtime-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './realtime-map.component.html',
  styleUrls: ['./realtime-map.component.scss']
})
export class RealtimeMapComponent implements OnInit, OnDestroy {
  center: google.maps.LatLngLiteral = { lat: 6.208488, lng: -75.563577 };
  zoom = 15;

  mapOptions: google.maps.MapOptions = {
    styles: map_styles,
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false
  };

  myLocation?: google.maps.LatLngLiteral;
  myMarkerOptions: google.maps.MarkerOptions = {
    icon: { url: 'assets/photo.jpg' },
    title: 'Mi Ubicación'
  };

  driverLocation?: google.maps.LatLngLiteral;
  driverMarkerOptions: google.maps.MarkerOptions = {
    icon: { url: 'assets/car.png' },
    title: 'Conductor Uber'
  };

  polylinePath: google.maps.LatLngLiteral[] = [];
  polylineOptions: google.maps.PolylineOptions = {
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 4,
    geodesic: true
  };

  tripStatus = 'Listo para solicitar viaje';
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
          this.myLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          this.center = { ...this.myLocation };
        },
        () => {
          this.myLocation = { lat: 6.208488, lng: -75.563577 };
          this.center = { ...this.myLocation };
        }
      );
    } else {
      this.myLocation = { lat: 6.208488, lng: -75.563577 };
    }
  }

  async requestTo(destination: string) {
    this.tripStatus = `Buscando conductor hacia ${destination}...`;
    const trip = await this.driverService.requestDriver(destination, this.myLocation);

    this.polylinePath = [
      { lat: trip.initialPosition.lat, lng: trip.initialPosition.lng },
      { lat: trip.endPosition.lat, lng: trip.endPosition.lng }
    ];

    this.driverSub?.unsubscribe();
    this.driverSub = this.driverService.getDriverPosition$(trip.driverId).subscribe(pos => {
      if (pos) {
        this.driverLocation = { lat: pos.lat, lng: pos.lng };
        this.tripStatus = `Conductor en camino (${destination})`;
      }
    });
  }
}
