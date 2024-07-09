import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { OrderStatus } from 'src/app/Enum/OrderStatus';
import { OrderStatusService } from '@service/orderStatus.service';
import { DeliveryManService } from '@service/delivery-man.service';
import { IOrderGetDTO } from 'src/app/Interface/IOrderGetDTO';
import { AccountService } from '@service/account.service';
import { LogoIconComponent } from '../../shared/logo-icon/logo-icon.component';

@Component({
  selector: 'app-deliveryman-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, LogoIconComponent],
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

  delivaryManId: number = Number(localStorage.getItem('userId'));
  status?: OrderStatus = undefined;
  orders: IOrderGetDTO[] = [];

  constructor(
    private orderStatusService: OrderStatusService,
    private deliveryManService: DeliveryManService,
    private accountService: AccountService,
    private router: Router
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

  logOut() {
    this.accountService.logOut().subscribe({
      next: (res) => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userToken');
        this.router.navigate(['']);
      },
      error: () => {},
      complete: () => {},
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('toggleSidebar');
  }
}
