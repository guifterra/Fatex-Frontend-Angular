import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sistema',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './sistema.component.html',
  styleUrl: './sistema.component.css'
})
export class SistemaComponent {

}
