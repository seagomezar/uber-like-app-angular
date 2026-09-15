import { TestBed } from '@angular/core/testing';
import { RealtimeMapV2Component } from './realtime-map-v2.component';
import { DriverService } from '../services/driver.service';

describe('RealtimeMapV2Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealtimeMapV2Component],
      providers: [DriverService]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RealtimeMapV2Component);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
