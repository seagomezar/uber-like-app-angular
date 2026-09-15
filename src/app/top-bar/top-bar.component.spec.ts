import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TopBarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
