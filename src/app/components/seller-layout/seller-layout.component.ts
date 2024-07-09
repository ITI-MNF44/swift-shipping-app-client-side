import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SellerSidebarComponent } from "./seller-sidebar/seller-sidebar.component";

@Component({
  selector: 'app-seller-layout',
  standalone: true,
  templateUrl: './seller-layout.component.html',
  styleUrl: './seller-layout.component.css',
  imports: [
    RouterOutlet,
    SellerSidebarComponent,
  ]
})
export class SellerLayoutComponent {}
