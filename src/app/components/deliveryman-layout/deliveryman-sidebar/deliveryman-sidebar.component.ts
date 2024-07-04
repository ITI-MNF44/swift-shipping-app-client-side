import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { OrderStatus } from 'src/app/Enum/OrderStatus';
import { OrderStatusService } from '@service/orderStatus.service';

@Component({
  selector: 'app-deliveryman-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './deliveryman-sidebar.component.html',
  styleUrl: './deliveryman-sidebar.component.css',
})
export class DeliverymanSidebarComponent implements OnInit {
  isSidebarOpen = true;

  orderStatuses: { [key: string]: string } = {};
  excludedStatuses: string[] = [
    'AcceptedByDeliveryCompany',
    'RejectedByDeliveryCompany',
  ];
  constructor(private orderStatusService: OrderStatusService) {}

  ngOnInit(): void {
    this.orderStatusService.getOrderStatuses().subscribe({
      next: (data) => {
        this.orderStatuses = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }


  keys(obj: { [key: string]: string }): Array<string> {
    return Object.keys(obj);
  }

  getOrdersByStatus(event: any) {
    const orderStatus: OrderStatus = event;
    console.log(orderStatus);
  }

  getAllOrders() {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('toggleSidebar');
  }
}
