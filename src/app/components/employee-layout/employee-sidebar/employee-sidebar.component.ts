import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '@service/account.service';
import { LogoIconComponent } from '../../shared/logo-icon/logo-icon.component';

@Component({
  selector: 'app-employee-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, LogoIconComponent],
  templateUrl: './employee-sidebar.component.html',
  styleUrl: './employee-sidebar.component.css',
})
export class EmployeeSidebarComponent {
  isSidebarOpen = true;

  constructor(private accountService: AccountService, private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('toggleSidebar');
  }

  logOut() {
    this.accountService.logOut().subscribe({
      next: (res) => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userToken');
        this.router.navigate(['']);
      },
      error: () => {},
      complete: () => {},
    });
  }
}
