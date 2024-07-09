import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegionService } from '@service/region.service';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IRegionGetDTO } from 'src/app/Interface/IRegionGetDTO';
import { NgbdModalConfirm } from '../../shared/modal-confirmation/modal-foucs.component';
import { IRolePermissions } from 'src/app/Interface/IRolePermissions';
import { Department } from 'src/app/Enum/Department';
import { RoleService } from '@service/role.service';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    HttpClientModule,
    CommonModule,
    InputTextModule,
    TagModule,
    MultiSelectModule,
    DropdownModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css',
})
export class CitiesEmployeeComponent implements OnInit {
  loading: boolean = true;
  searchValue: string | undefined;

  cities: IRegionGetDTO[] = [];

  rolePermissions?: IRolePermissions;
  roleName = localStorage.getItem('userRole') || '';
  department = Department.Regions;

  private modalService = inject(NgbModal);
  constructor(
    private regionService: RegionService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.loading = false;
    this.roleService
      .getPermissionsByRoleAndDept(this.roleName, this.department)
      .subscribe({
        next: (data) => {
          this.rolePermissions = data;
          console.log(data);
        },
      });
    this.getAllCities();
  }

  open(id: number) {
    const modalRef = this.modalService.open(NgbdModalConfirm);
    modalRef.result.then(
      (result) => {
        if (result === 'Ok click') {
          console.log('User confirmed');
          this.deleteRegion(id);
        }
      },
      (reason) => {
        if (reason === 'cancel click') {
          console.log('User canceled');
        }
      }
    );
  }

  getAllCities() {
    this.regionService.getAllRegions().subscribe({
      next: (response) => {
        this.cities = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  deleteRegion(id: number) {
    this.regionService.deleteRegion(id).subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.getAllCities();
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  //Table
  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  getSeverity(status: string): string | null {
    switch (status.toLowerCase()) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return null;

      default:
        return null;
    }
  }

  getBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'unqualified':
        return 'badge-danger';
      case 'qualified':
        return 'badge-success';
      case 'new':
        return 'badge-info';
      case 'negotiation':
        return 'badge-warning';
      case 'renewal':
        return 'badge-primary';
      default:
        return '';
    }
  }
}
