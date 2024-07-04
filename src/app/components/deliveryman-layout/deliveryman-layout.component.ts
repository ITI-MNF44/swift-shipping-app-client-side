import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeliverymanSidebarComponent } from './deliveryman-sidebar/deliveryman-sidebar.component';

@Component({
  selector: 'app-deliveryman-layout',
  standalone: true,
  imports: [RouterOutlet, DeliverymanSidebarComponent],
  templateUrl: './deliveryman-layout.component.html',
  styleUrl: './deliveryman-layout.component.css'
})
export class DeliverymanLayoutComponent {

}
