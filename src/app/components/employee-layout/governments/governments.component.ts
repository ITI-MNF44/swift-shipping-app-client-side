import { GovernmentService } from './../../../service/government.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IGovernmentGetDTO } from 'src/app/Interface/IGovernmentGetDTO';
import { Router } from '@angular/router';
import { RoleService } from '@service/role.service';
import { IRolePermissions } from 'src/app/Interface/IRolePermissions';
import { Department } from 'src/app/Enum/Department';

@Component({
  selector: 'app-governments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './governments.component.html',
  styleUrl: './governments.component.css',
})
export class GovernmentsEmployeeComponent implements OnInit {
  governemnts: IGovernmentGetDTO[] = [];
  rolePermissions?: IRolePermissions;
  roleName = localStorage.getItem('userRole') || '';
  department = Department.Governments;
  constructor(
    private GovernmentService: GovernmentService,
    private router: Router,
    private roleService: RoleService
  ) {}

  roleRouting: string | null = null;

  ngOnInit(): void {
    const role = localStorage.getItem('userRole');
    if (role == 'Admin') {
      this.roleRouting = 'admin';
    } else if (role == 'Employee') {
      this.roleRouting = 'employee';
    }

    this.roleService
      .getPermissionsByRoleAndDept(this.roleName, this.department)
      .subscribe({
        next: (data) => {
          this.rolePermissions = data;
          console.log(data);
        },
      });
    this.getAllGovernments();
  }

  getAllGovernments(): void {
    this.GovernmentService.getAll().subscribe({
      next: (data) => {
        this.governemnts = data;
      },
      error: (error) => {
        console.log(console.log(error));
      },
    });
  }

  deleteGovernemnt(governemntId: number) {
    this.GovernmentService.deleteGovernment(governemntId).subscribe({
      next: (data) => {
        console.log(data);
        this.governemnts = this.governemnts.filter((x) => x.id != governemntId);
      },
      error: (error) => {
        console.log(console.log(error));
      },
    });
  }

  editGovernment(id: number) {
    this.router.navigate([`${this.roleRouting}/governments/edit/${id}`]);
  }
}
