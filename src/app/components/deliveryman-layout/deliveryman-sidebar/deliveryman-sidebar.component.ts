import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-deliveryman-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './deliveryman-sidebar.component.html',
  styleUrl: './deliveryman-sidebar.component.css'
})
export class DeliverymanSidebarComponent {

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log("toggleSidebar");

  }
}
