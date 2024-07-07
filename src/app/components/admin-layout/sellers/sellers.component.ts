import { Component, OnInit } from '@angular/core';
import { BranchService } from '@service/branch.service';
import { TagModule } from 'primeng/tag';
import { Table, TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '@service/employee.service';
import { IEmployeeDTO } from 'src/app/Interface/IEmployeeDTO';
import { Router, RouterLink } from '@angular/router';
import { IBranchGetDTO } from 'src/app/Interface/IBranchGetDTO';
import { IEmployeeGetDTO } from 'src/app/Interface/IEmployeeGetDTO';


@Component({
  selector: 'app-sellers',
  standalone: true,
  imports: [
    TableModule, HttpClientModule, CommonModule, InputTextModule, TagModule,
    MultiSelectModule, DropdownModule, ButtonModule, FormsModule, RouterLink
  ],
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.css'
})
export class SellersComponent implements OnInit {
  employees: IEmployeeDTO[] = [];
  employeesWIthBranchName: IEmployeeGetDTO[] = [];
  branches: IBranchGetDTO[] = [];
  employee: IEmployeeGetDTO | undefined;
  loading: boolean = true;
  searchValue: string | undefined;

  constructor(
    private route: Router,
    private employeeService: EmployeeService,
    private branchService: BranchService) { }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((employees) => {
      this.employees = employees.map(employee => ({
        ...employee,
        status: employee.status ?? true
      }));
      this.loadBranches();
      this.loading = false;
    });
  }

  loadBranches(): void {
    this.branchService.getAllBranches().subscribe(
      (data: IBranchGetDTO[]) => {
        this.branches = data;
        this.employees = this.employees.map(employee => ({
          ...employee,
          branchName: this.branches.find(branch => branch.id === employee.branchId)?.name
        }
        ));
        console.log(this.branches);
      },
      (error) => {
        console.error('Error fetching branches', error);
      }
    );
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  onToggleStatus(employee: IEmployeeGetDTO) {
    this.employeeService.toggleActivityStatus(employee.id).subscribe({
      next: () => {
        employee.status = !employee.status;
      },
      error: (err) => {
        console.error('Error toggling status', err);
        this.employeeService.getById(employee.id).subscribe((updatedEmployee) => {
          employee.status = updatedEmployee.status;
        });
      }
    });
  }

  deleteEmployee(employeeId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this Employee?');
    if (confirmDelete) {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        () => {
          this.route.navigateByUrl('admin/employees');
          this.employeesWIthBranchName = this.employeesWIthBranchName.filter((employee) => employee.id !== employeeId);
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }

}
