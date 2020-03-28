import { Component, AfterViewInit } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "@angular/fire/firestore";
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map_styles } from '../realtime-map-v2/map_styles';

@Component({
  selector: 'app-realtime-map-v3',
  templateUrl: './realtime-map-v3.component.html',
  styleUrls: ['./realtime-map-v3.component.scss']
})
export class RealtimeMapV3Component implements AfterViewInit {
  myLocation = {lat: 6.236654, lng: -75.580432};
  driverLocation: any;
  map_styles = map_styles;
  zoomLevel = 15;
  zoomControl = false;
  streetViewControl = false;
  mapTypeControl = false;
  driversCollection: AngularFirestoreCollection<any>;
  driverMarker: any;
  assignedDriverPosition$: Observable<any>;
  routePath: any;
  lineEndPoint: any;
  lineStartPoint: any;
  

  constructor(private angularFirestore: AngularFirestore) {}

  ngAfterViewInit() {
    this.loadMyPosition();
    this.driversCollection = this.angularFirestore.collection("drivers", ref =>
      ref.orderBy("order")
    );
  }

  loadMyPosition() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        this.setMyLocationOnMap.bind(this),
        err => {
          console.log("We can not get current location, using location by default", err);
          this.setMyLocationOnMap({
            coords: {
              latitude: 6.208488,
              longitude: -75.563577
            }
          });
        }
      );
    } else {
      alert("Your browser does not support Geolocation");
    }
  }
  setMyLocationOnMap(position) {
    this.myLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
  }


  async requestTo(destination) {
    const response = await this.lookForDriverTo(destination)
    this.assignedDriverPosition$ = this.driversCollection.doc(response.driver.id).valueChanges();
    this.drawLine(response.driver.initialPosition, response.driver.endPosition);
    this.assignedDriverPosition$.subscribe(position => {
      this.driverLocation = {lat: position.lat, lng: position.lng};
    });
    this.updateDriversPosition(response.driver.id)
  }

  lookForDriverTo(destination): Promise<{driver: {id: string, initialPosition: any, endPosition: any}}> {
    return new Promise( async (accept, reject)=>{
      // Do heavy work here using the destination to find nearby driver

      const driver = {
        id: "WGLuf6IJDmLXzC9nP8Na", 
        initialPosition: {lat: 4.682905, lng: -74.070275},
        endPosition: {lat: 4.679705, lng: -74.066977}
      };
      //Set initial position
      await this.driversCollection.doc(driver.id).set(driver.initialPosition)
      accept( { driver });
    })
  }

  drawLine(a, b){
    this.lineStartPoint = a;
    this.lineEndPoint = b;
  }

  // This function should be on the backend or in drivers app but...
  updateDriversPosition(driverId) {
    let position = {
      lat: 4.682905, 
      lng: -74.070275
    };
    const step = 0.000006; // Play with the distance of every driver step
    const refreshTime = 400; // Play with the refresh position of the driver
    const refreshId = setInterval(async () =>{
      position.lat -= step;
      position.lng += step;
      await this.driversCollection.doc(driverId).set(position)
      if (position.lat < 4.679705) {
        clearInterval(refreshId);
      }
    }, refreshTime);
  }

}
