import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive } from '@angular/router';
import { OrderStatus } from 'src/app/Enum/OrderStatus';
import { OrderStatusService } from '@service/orderStatus.service';
import { DeliveryManService } from '@service/delivery-man.service';
import { IOrderGetDTO } from 'src/app/Interface/IOrderGetDTO';

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
    'New',
    'AcceptedByDeliveryCompany',
    'RejectedByDeliveryCompany',
  ];

  delivaryManId: number = 1;
  status?: OrderStatus = undefined;
  orders: IOrderGetDTO[] = [];

  constructor(
    private orderStatusService: OrderStatusService,
    private deliveryManService: DeliveryManService,
  ) {}

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

    this.getdelivaryManOrders();
  }

  keys(obj: { [key: string]: string }): Array<string> {
    return Object.keys(obj);
  }

  getOrdersByStatus(index: number) {
    this.status = index + 1;
    this.getdelivaryManOrders();
  }

  getAllOrders() {
    this.status = undefined;
    this.getdelivaryManOrders();
  }

  getdelivaryManOrders() {
    this.deliveryManService
      .getDeliveryManOrders(this.delivaryManId, this.status)
      .subscribe({
        next: (response) => {
          this.orders = response;
          this.deliveryManService.setOrders(response);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {},
      });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('toggleSidebar');
  }
}
