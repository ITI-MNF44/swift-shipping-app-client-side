import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegionService } from '@service/region.service';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IRegionGetDTO } from 'src/app/Interface/IRegionGetDTO';

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
    MultiSelectModule, // Add MultiSelectModule here
    DropdownModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css',
})
export class CitiesComponent implements OnInit {
  loading: boolean = true;
  searchValue: string | undefined;

  cities: IRegionGetDTO[] = [];

  constructor(private regionService: RegionService) {}

  ngOnInit(): void {
    this.loading = false;

    this.regionService.getAllRegions().subscribe({
      next: (response) => {
        this.cities = response;
        console.log('regions : ', this.cities);
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
        console.log(response);
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
