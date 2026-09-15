import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, BottomBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'uber-like-app';
}
