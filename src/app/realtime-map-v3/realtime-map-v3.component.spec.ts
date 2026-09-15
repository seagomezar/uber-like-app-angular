import { TestBed } from '@angular/core/testing';
import { RealtimeMapV3Component } from './realtime-map-v3.component';
import { DriverService } from '../services/driver.service';

function setupGoogleMock() {
  if (!(window as any).google) {
    (window as any).google = {
      maps: {
        Map: class {
          setCenter() {}
          setZoom() {}
          setOptions() {}
          addListener() { return { remove: () => {} }; }
        },
        Marker: class {
          setMap() {}
          setPosition() {}
          setOptions() {}
          addListener() { return { remove: () => {} }; }
        },
        Polyline: class {
          setMap() {}
          setPath() {}
          setOptions() {}
          addListener() { return { remove: () => {} }; }
        },
        LatLng: class {
          constructor(public lat: number, public lng: number) {}
        },
        Animation: { DROP: 1 },
        MapTypeId: { ROADMAP: 'roadmap' }
      }
    };
  }
}

describe('RealtimeMapV3Component', () => {
  beforeEach(async () => {
    setupGoogleMock();
    await TestBed.configureTestingModule({
      imports: [RealtimeMapV3Component],
      providers: [DriverService]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RealtimeMapV3Component);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
