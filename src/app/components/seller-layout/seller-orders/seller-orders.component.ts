import { IOrderGetDTO } from './../../../Interface/IOrderGetDTO';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { SellersService } from '@service/seller.service';
import { OrderStatus } from 'src/app/Enum/OrderStatus';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// /

import { TagModule } from 'primeng/tag';
import { Table, TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';



@Component({
  selector: 'app-seller-orders-bystatus',
  standalone: true,
  imports: [TableModule, HttpClientModule, CommonModule, InputTextModule, TagModule, MultiSelectModule, // Add MultiSelectModule here
    DropdownModule, ButtonModule, FormsModule],
  templateUrl: './seller-orders.component.html',
  styleUrl: './seller-orders.component.css'
})
export class SellerOrdersByStatusComponent implements OnInit{

  sellerId:number;
  orderStatusId: number;
  orders: IOrderGetDTO[] = [];

  // table variable
    searchValue: string | undefined;
    representatives!: any;
    statuses!: any[];
    loading: boolean = true;
    activityValues: number[] = [0, 100];


  constructor(public activatedRoute: ActivatedRoute,
    private SellerService: SellersService
  ) {
		this.sellerId = Number(localStorage.getItem('userId'));
		this.orderStatusId = this.activatedRoute.snapshot.params['statusId'];

	}
  ngOnInit(): void {
    // console.log(this.sellerId, this.orderStatusId, `${environment.apiUrl}/${this.sellerId}/${this.orderStatusId}`);

    this.SellerService.getSellersOrdersByStatus(this.sellerId, this.orderStatusId).subscribe({
      next: (data) => {
        this.orders = data;
        // console.log(this.orders.length);
        console.log(data);
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


}
