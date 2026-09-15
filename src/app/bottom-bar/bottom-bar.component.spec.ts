import { TestBed } from '@angular/core/testing';
import { BottomBarComponent } from './bottom-bar.component';

describe('BottomBarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomBarComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BottomBarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
