import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeliveryManService } from '@service/delivery-man.service';
import { OrderService } from '@service/order.service';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { OrderStatus } from 'src/app/Enum/OrderStatus';
import { IOrderGetDTO } from 'src/app/Interface/IOrderGetDTO';

@Component({
  selector: 'app-delivary-man-orders',
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
  ],
  templateUrl: './delivary-man-orders.component.html',
  styleUrl: './delivary-man-orders.component.css',
})
export class DelivaryManOrdersComponent implements OnInit {
  orders: IOrderGetDTO[] = [];
  orderStatuses = OrderStatus; // Reference to the enum
  orderStatusKeys: number[] = []; // Keys of the enum to populate the dropdown

  OrderStatusStrings: { [key in OrderStatus]: string } = {
    [OrderStatus.New]: 'New',
    [OrderStatus.AcceptedByDeliveryCompany]: 'Accepted to delivery',
    [OrderStatus.RejectedByDeliveryCompany]: 'Rejected delivery',
    [OrderStatus.Pending]: 'Pending',
    [OrderStatus.Delivered]: 'Delivered',
    [OrderStatus.DeliveredToDeliveryMan]: 'With Delivery Man',
    [OrderStatus.CanNotBeReached]: "Can't Be Reached",
    [OrderStatus.Postponed]: 'Postponed',
    [OrderStatus.PartiallyDelivered]: 'Partially Delivered',
    [OrderStatus.CanceledByCustomer]: 'Canceled By Customer',
    [OrderStatus.RejectWithPayment]: 'Rejected & Paid',
    [OrderStatus.RejectWithoutPayment]: 'Rejected & Not Paid',
    [OrderStatus.RejectWithPartiallyPaid]: 'Rejected & Partially Paid',
  };

  loading: boolean = true;
  searchValue: string | undefined;

  constructor(
    private deliveryManService: DeliveryManService,
    private orderService: OrderService
  ) {}
  ngOnInit(): void {
    this.deliveryManService.DeliveryManOrders.subscribe({
      next: (response) => {
        this.orders = response;

        this.orderStatusKeys = Object.keys(this.orderStatuses)
          .filter((key) => !isNaN(Number(key)))
          .map((key) => Number(key));

        this.loading = false;
      },
      error: (error) => {},
      complete: () => {},
    });
  }

  getStatusLabel(status: OrderStatus): string {
    return this.OrderStatusStrings[status];
  }

  ChangeOrderStatus(event: any, orderId: any) {
    const orderStatus:OrderStatus = Number((event.target as HTMLSelectElement).value);

    this.orderService.changeOrderStatus(orderStatus, orderId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  // Table
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
