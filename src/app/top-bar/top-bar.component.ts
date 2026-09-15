import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {}
