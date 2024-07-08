import { Department } from './../../../Enum/Department';
import { RoleService } from '@service/role.service';
import { BranchService } from './../../../service/branch.service';
import { Component, OnInit, NgModule } from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { IBranchGetDTO } from 'src/app/Interface/IBranchGetDTO';
import { IRolePermissions } from 'src/app/Interface/IRolePermissions';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [DatePipe, RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
})
export class BranchesEmployeeComponent implements OnInit {
  // here i need to get all products from api
  branches: IBranchGetDTO[] = [];
  rolePermissions?: IRolePermissions;
  roleName = localStorage.getItem('userRole') || '';
  department = Department.Branches;

  //CTOR
  constructor(
    private branchService: BranchService,
    private route: Router,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.roleService
      .getPermissionsByRoleAndDept(this.roleName, this.department)
      .subscribe({
        next: (data) => {
          this.rolePermissions = data;
          console.log(data);
        },
      });
    // Get all branches
    this.getAllBranches();
  }

  getAllBranches(): void {
    this.branchService.getAllBranches().subscribe((branches) => {
      this.branches = branches;
    });
  }

  //refresh the page
  refreshPage(): void {
    this.getAllBranches();
  }

  //Handle Delete
  deleteBranch(branchId: number): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete this Branch?'
    );
    if (confirmDelete) {
      this.branchService.deleteBranch(branchId).subscribe(
        () => {
          //alert('Successfully Deleted');
          this.route.navigateByUrl('admin/branches');
        },
        (error) => {
          console.error('Error deleting branch:', error);
        }
      );
    }
  }
}
