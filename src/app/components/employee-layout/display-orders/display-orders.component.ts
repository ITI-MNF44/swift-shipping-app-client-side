import { Component, OnInit } from '@angular/core';
import { IOrderGetDTO } from './../../../Interface/IOrderGetDTO';
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
import { environment } from 'src/environments/environment';
import { OrderService } from '@service/order.service';

@Component({
  selector: 'app-display-orders',
  standalone: true,
  imports: [TableModule, HttpClientModule, CommonModule, InputTextModule, TagModule, MultiSelectModule, // Add MultiSelectModule here
    DropdownModule, ButtonModule, FormsModule],
  templateUrl: './display-orders.component.html',
  styleUrl: './display-orders.component.css'
})




export class DisplayOrdersComponent implements OnInit {
  
  orders: IOrderGetDTO[] = [];

    // table variable
    searchValue: string | undefined;
    representatives!: any;
    statuses!: any[];
    loading: boolean = true;
    activityValues: number[] = [0, 100];
    
  constructor(
    private OrderService: OrderService,
    ){}

  ngOnInit(): void {
    this.OrderService.getAll().subscribe({
      next: (data)=>{this.orders = data; this.loading=false},
      error: (error)=>{console.log(error)}
    })
  }


}
