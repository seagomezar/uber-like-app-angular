import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, interval, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot, setDoc, Firestore } from 'firebase/firestore';

export interface LocationCoord {
  lat: number;
  lng: number;
}

export interface DriverTrip {
  driverId: string;
  initialPosition: LocationCoord;
  endPosition: LocationCoord;
}

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private firestore?: Firestore;
  private firebaseInitialized = false;
  private activeSimulationSub?: Subscription;
  private currentPosition$ = new BehaviorSubject<LocationCoord | null>(null);

  constructor() {
    this.initFirebase();
  }

  private initFirebase() {
    const config = environment.firebaseConfig;
    if (config && config.projectId && config.apiKey) {
      try {
        const app: FirebaseApp = getApps().length === 0 ? initializeApp(config) : getApps()[0];
        this.firestore = getFirestore(app);
        this.firebaseInitialized = true;
        console.log('[DriverService] Firebase Firestore conectado correctamente.');
      } catch (err) {
        console.warn('[DriverService] Error al inicializar Firebase, usando modo simulación:', err);
        this.firebaseInitialized = false;
      }
    } else {
      console.log('[DriverService] Modo simulación activo (no se configuraron credenciales de Firebase).');
      this.firebaseInitialized = false;
    }
  }

  public async requestDriver(destination: string, userLocation?: LocationCoord): Promise<DriverTrip> {
    this.stopSimulation();

    // Coordenadas iniciales cerca del usuario si está disponible, o coordenadas por defecto (Medellín)
    const baseLat = userLocation?.lat ?? 6.208488;
    const baseLng = userLocation?.lng ?? -75.563577;

    const initialPosition: LocationCoord = {
      lat: baseLat + 0.0075,
      lng: baseLng - 0.0065
    };
    const endPosition: LocationCoord = {
      lat: baseLat,
      lng: baseLng
    };

    const trip: DriverTrip = {
      driverId: 'driver_uber_001',
      initialPosition,
      endPosition
    };

    if (this.firebaseInitialized && this.firestore) {
      try {
        const driverDoc = doc(this.firestore, 'drivers', trip.driverId);
        await setDoc(driverDoc, trip.initialPosition);
      } catch (err) {
        console.warn('[DriverService] Error al escribir en Firestore, activando simulación local:', err);
      }
    }

    this.startSimulation(trip);
    return trip;
  }

  public getDriverPosition$(driverId: string): Observable<LocationCoord | null> {
    if (this.firebaseInitialized && this.firestore) {
      const driverDoc = doc(this.firestore, 'drivers', driverId);
      return new Observable<LocationCoord | null>(observer => {
        const unsubscribe = onSnapshot(driverDoc, snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.data() as LocationCoord;
            observer.next(data);
          }
        }, err => {
          console.warn('[DriverService] Firestore snapshot error, alternando a simulación:', err);
          this.currentPosition$.subscribe(pos => observer.next(pos));
        });
        return () => unsubscribe();
      });
    }

    return this.currentPosition$.asObservable();
  }

  private startSimulation(trip: DriverTrip) {
    this.stopSimulation();
    let currentLat = trip.initialPosition.lat;
    let currentLng = trip.initialPosition.lng;
    const targetLat = trip.endPosition.lat;
    const targetLng = trip.endPosition.lng;

    const totalSteps = 120; // Pasos de animación suave
    const stepLat = (targetLat - currentLat) / totalSteps;
    const stepLng = (targetLng - currentLng) / totalSteps;
    let stepCount = 0;

    this.currentPosition$.next({ lat: currentLat, lng: currentLng });

    this.activeSimulationSub = interval(250).subscribe(async () => {
      stepCount++;
      currentLat += stepLat;
      currentLng += stepLng;

      const newPos = { lat: currentLat, lng: currentLng };
      this.currentPosition$.next(newPos);

      // Si Firebase está activo, sincronizamos también la posición
      if (this.firebaseInitialized && this.firestore) {
        try {
          const driverDoc = doc(this.firestore, 'drivers', trip.driverId);
          await setDoc(driverDoc, newPos);
        } catch {
          // Fallback silencioso
        }
      }

      if (stepCount >= totalSteps) {
        this.stopSimulation();
      }
    });
  }

  public stopSimulation() {
    if (this.activeSimulationSub) {
      this.activeSimulationSub.unsubscribe();
      this.activeSimulationSub = undefined;
    }
  }
}
