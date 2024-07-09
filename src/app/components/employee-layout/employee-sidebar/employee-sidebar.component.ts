import { IRolePermissions } from './../../../Interface/IRolePermissions';
import { Department } from './../../../Enum/Department';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '@service/account.service';
import { LogoIconComponent } from '../../shared/logo-icon/logo-icon.component';

import { RoleService } from '@service/role.service';

@Component({
  selector: 'app-employee-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, LogoIconComponent],
  templateUrl: './employee-sidebar.component.html',
  styleUrl: './employee-sidebar.component.css',
})
export class EmployeeSidebarComponent implements OnInit {
  isSidebarOpen = true;

  roleName = localStorage.getItem('userRole') || '';
  BranchRolePermissions?: IRolePermissions;
  RegionRolePermissions?: IRolePermissions;
  GovernmentRolePermissions?: IRolePermissions;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private roleService: RoleService
  ) {}
  ngOnInit(): void {
    this.roleService
      .getPermissionsByRoleAndDept(this.roleName, Department.Branches)
      .subscribe({
        next: (data) => {
          this.BranchRolePermissions = data;
        },
      });
    this.roleService
      .getPermissionsByRoleAndDept(this.roleName, Department.Regions)
      .subscribe({
        next: (data) => {
          this.RegionRolePermissions = data;
        },
      });
    this.roleService
      .getPermissionsByRoleAndDept(this.roleName, Department.Governments)
      .subscribe({
        next: (data) => {
          this.GovernmentRolePermissions = data;
        },
      });
  }

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
