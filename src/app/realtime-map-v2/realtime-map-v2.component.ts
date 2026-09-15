import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { map_styles } from './map_styles';
import { DriverService, LocationCoord } from '../services/driver.service';

@Component({
  selector: 'app-realtime-map-v2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './realtime-map-v2.component.html',
  styleUrls: ['./realtime-map-v2.component.scss']
})
export class RealtimeMapV2Component implements AfterViewInit, OnDestroy {
  @ViewChild('map', { static: true }) mapElement!: ElementRef<HTMLDivElement>;

  map!: google.maps.Map;
  myMarker: google.maps.Marker | null = null;
  driverMarker: google.maps.Marker | null = null;
  routePath: google.maps.Polyline | null = null;
  myLocation: LocationCoord = { lat: 6.208488, lng: -75.563577 };

  private driverSub?: Subscription;

  constructor(private driverService: DriverService) {}

  ngAfterViewInit() {
    this.loadMap();
  }

  ngOnDestroy() {
    this.driverSub?.unsubscribe();
    this.driverService.stopSimulation();
    if (this.myMarker) this.myMarker.setMap(null);
    if (this.driverMarker) this.driverMarker.setMap(null);
    if (this.routePath) this.routePath.setMap(null);
  }

  loadMap() {
    const latLng = new google.maps.LatLng(this.myLocation.lat, this.myLocation.lng);
    const mapOptions: google.maps.MapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      styles: map_styles
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.loadMyPosition();
  }

  loadMyPosition() {
    if (typeof window !== 'undefined' && window.navigator?.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        pos => {
          this.setMyLocationOnMap({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        err => {
          console.log('[v2] Usando ubicación predeterminada por fallback:', err);
          this.setMyLocationOnMap(this.myLocation);
        }
      );
    } else {
      this.setMyLocationOnMap(this.myLocation);
    }
  }

  setMyLocationOnMap(coords: LocationCoord) {
    this.myLocation = coords;
    if (this.myMarker) {
      this.myMarker.setMap(null);
      this.myMarker = null;
    }

    const latLng = new google.maps.LatLng(coords.lat, coords.lng);
    this.myMarker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      icon: { url: 'assets/photo.jpg' },
      title: 'Mi Ubicación'
    });

    this.map.setCenter(latLng);
  }

  async requestTo(destination: string) {
    const trip = await this.driverService.requestDriver(destination, this.myLocation);
    this.drawLine(trip.initialPosition, trip.endPosition);

    this.driverSub?.unsubscribe();
    this.driverSub = this.driverService.getDriverPosition$(trip.driverId).subscribe(position => {
      if (!position) return;

      if (this.driverMarker) {
        this.driverMarker.setMap(null);
        this.driverMarker = null;
      }

      const latLng = new google.maps.LatLng(position.lat, position.lng);
      this.driverMarker = new google.maps.Marker({
        map: this.map,
        position: latLng,
        icon: { url: 'assets/car.png' },
        title: 'Conductor Uber'
      });
    });
  }

  drawLine(a: LocationCoord, b: LocationCoord) {
    if (this.routePath) {
      this.routePath.setMap(null);
    }

    this.routePath = new google.maps.Polyline({
      path: [
        new google.maps.LatLng(a.lat, a.lng),
        new google.maps.LatLng(b.lat, b.lng)
      ],
      geodesic: true,
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });

    this.routePath.setMap(this.map);
  }
}
