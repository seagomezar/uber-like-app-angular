import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeMapComponent } from './realtime-map.component';

describe('RealtimeMapComponent', () => {
  let component: RealtimeMapComponent;
  let fixture: ComponentFixture<RealtimeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
