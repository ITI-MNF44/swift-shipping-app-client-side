import { Component, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Table, TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ISellerGetDTO } from 'src/app/Interface/ISellerGetDTO';
import { Router, RouterLink } from '@angular/router';
import { SellersService } from '@service/seller.service';

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
  sellers: ISellerGetDTO[] = [];
  loading: boolean = true;
  searchValue: string | undefined;

  constructor(
    private router: Router,
    private sellersService: SellersService
  ) { }

  ngOnInit(): void {
    this.sellersService.getAllSellers().subscribe((sellers) => {
      this.sellers = sellers;
      this.loading = false;
    });
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  deleteSeller(sellerId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this Seller?');
    if (confirmDelete) {
      this.sellersService.deleteSeller(sellerId).subscribe(
        () => {
          this.router.navigateByUrl('admin/sellers');
          this.sellers = this.sellers.filter((seller) => seller.id !== sellerId);
        },
        (error) => {
          console.error('Error deleting seller:', error);
        }
      );
    }
  }
}
