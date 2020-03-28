import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeMapV3Component } from './realtime-map-v3.component';

describe('RealtimeMapV3Component', () => {
  let component: RealtimeMapV3Component;
  let fixture: ComponentFixture<RealtimeMapV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeMapV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeMapV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
