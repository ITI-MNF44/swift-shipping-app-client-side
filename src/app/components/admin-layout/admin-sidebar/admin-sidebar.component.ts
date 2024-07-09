import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '@service/account.service';
import { LogoComponent } from '../../shared/logo/logo.component';
import { LogoIconComponent } from '../../shared/logo-icon/logo-icon.component';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    LogoComponent,
    LogoIconComponent,
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
})
export class AdminSidebarComponent {
  isSidebarOpen = true;

  constructor(private accountService: AccountService, private router: Router) {}
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('toggleSidebar');
  }

  logOut() {
    this.accountService.logOut().subscribe({
      next: (res) => {
        if (res.status == 200) {
          localStorage.removeItem('userId');
          localStorage.removeItem('userRole');
          localStorage.removeItem('userToken');
          this.router.navigate(['']);
        }
      },
      error: () => {},
      complete: () => {},
    });
  }
}
