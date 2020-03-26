import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-realtime-map-v2',
  templateUrl: './realtime-map-v2.component.html',
  styleUrls: ['./realtime-map-v2.component.scss']
})
export class RealtimeMapV2Component implements AfterViewInit {
  @ViewChild("map", {static: true }) mapElement: ElementRef;
  map: any;
  myMarker: any;

  ngAfterViewInit() {
    this.loadMap();
  }

  // Set Map
  loadMap() {
    let latLng = new google.maps.LatLng(6.236654, -75.580432);
    let mapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      styles: [
        {
          elementType: "geometry",
          stylers: [
            {
              color: "#212121"
            }
          ]
        },
        {
          elementType: "labels.icon",
          stylers: [
            {
              "visibility": "off"
            }
          ]
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#757575"
            }
          ]
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#212121"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [
            {
              color: "#757575"
            }
          ]
        },
        {
          featureType: "administrative.country",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#9e9e9e"
            }
          ]
        },
        {
          featureType: "administrative.land_parcel",
          stylers: [
            {
              "visibility": "off"
            }
          ]
        },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#bdbdbd"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#757575"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [
            {
              color: "#181818"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#616161"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1b1b1b"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#2c2c2c"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#8a8a8a"
            }
          ]
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
            {
              color: "#373737"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [
            {
              color: "#3c3c3c"
            }
          ]
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry",
          stylers: [
            {
              color: "#4e4e4e"
            }
          ]
        },
        {
          featureType: "road.local",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#616161"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#757575"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#000000"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#3d3d3d"
            }
          ]
        }
      ]
    };
    console.log(this.mapElement)
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.loadMyPosition();
  }

  // Get My Position
  loadMyPosition() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        this.setMyLocationOnMap.bind(this),
        err => {
          console.log(
            "No se pudo obtener la location, usando location by default",
            err
          );
          this.setMyLocationOnMap({
            coords: {
              latitude: 6.208488,
              longitude: -75.563577
            }
          });
        }
      );
      this.setMyLocationOnMap({
        coords: {
          latitude: 6.208488,
          longitude: -75.563577
        }
      });
    } else {
      alert("Tu navegador no soporta geolocalización");
      this.setMyLocationOnMap({
        coords: {
          latitude: 6.208488,
          longitude: -75.563577
        }
      });
    }
  }

  setMyLocationOnMap(position) {
    if (this.myMarker) {
      this.myMarker.setMap(null);
      this.myMarker = null;
    }
    let latLng = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );

    this.myMarker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      position: latLng,
      icon: { url: "assets/photo.jpg" }
    });
  }

}
