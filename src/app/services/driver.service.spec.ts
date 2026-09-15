import { TestBed } from '@angular/core/testing';
import { DriverService } from './driver.service';

describe('DriverService', () => {
  let service: DriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request a driver and start a trip', async () => {
    const trip = await service.requestDriver('home');
    expect(trip).toBeDefined();
    expect(trip.driverId).toBe('driver_uber_001');
    expect(trip.initialPosition.lat).toBeDefined();
    expect(trip.endPosition.lat).toBeDefined();
    service.stopSimulation();
  });
});
