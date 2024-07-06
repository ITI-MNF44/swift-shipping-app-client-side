import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '@service/account.service';

@Component({
  selector: 'app-seller-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './seller-sidebar.component.html',
  styleUrl: './seller-sidebar.component.css',
})
export class SellerSidebarComponent {
  isSidebarOpen = true;

  constructor(private accountService: AccountService, private router: Router) {}

  logOut() {
    this.accountService.logOut().subscribe({
      next: (res) => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userToken');
        this.router.navigate(['/seller/login']);
      },
      error: () => {},
      complete: () => {},
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('toggleSidebar');
  }
}
