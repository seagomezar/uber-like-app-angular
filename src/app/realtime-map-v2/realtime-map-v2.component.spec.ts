import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeMapV2Component } from './realtime-map-v2.component';

describe('RealtimeMapV2Component', () => {
  let component: RealtimeMapV2Component;
  let fixture: ComponentFixture<RealtimeMapV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeMapV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeMapV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
