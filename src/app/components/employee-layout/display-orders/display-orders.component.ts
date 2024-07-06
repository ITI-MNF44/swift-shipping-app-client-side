import { CommonModule, DatePipe } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DeliveryManService } from '@service/delivery-man.service';
import { OrderService } from '@service/order.service';
import { IDeliveryManGetDTO } from 'src/app/Interface/IDeliveryManGetDTO';
import { IOrderGetDTO } from 'src/app/Interface/IOrderGetDTO';
import { OrderStatus } from 'src/app/Enum/OrderStatus';
import { IRegionGetDTO } from 'src/app/Interface/IRegionGetDTO';
import { RegionService } from '@service/region.service';

@Component({
  selector: 'app-display-orders',
  standalone: true,
  imports: [DatePipe, RouterLink,FormsModule,
     RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './display-orders.component.html',
  styleUrls: ['./display-orders.component.css'],
})
export class DisplayOrdersComponent implements OnInit 
{
  NewOrders: IOrderGetDTO[] = [];
  deliveryMans: IDeliveryManGetDTO[] = [];

  constructor(
    private orderService: OrderService,
    private route: Router,
    private activatedroute: ActivatedRoute,
    private deliveryManService: DeliveryManService,
    private regionService : RegionService
  ) {}

  ngOnInit(): void 
  {
    this.getDeliveryMans();
    this.getAllNewOrders();
  }

  getAllNewOrders(): void {
    this.orderService.getByStatus(OrderStatus.New).subscribe((orders) => {
      this.NewOrders = orders;
    });
  }

  getDeliveryMans(): void {
    this.deliveryManService.getAllDeliveryMen().subscribe((deliveryMans) => {
      this.deliveryMans = deliveryMans;
    });
  }

  acceptOrder(orderId: number): void {
    this.orderService.changeOrderStatus(OrderStatus.AcceptedByDeliveryCompany, orderId).subscribe(
      () => {
        this.getAllNewOrders(); 
      },
      error => {
        console.error('Error accepting order:', error);
      }
    );
  }
  
  rejectOrder(orderId: number): void 
  {
    this.orderService.changeOrderStatus(OrderStatus.RejectedByDeliveryCompany, orderId).subscribe(
      () => {
        this.getAllNewOrders(); 
      },
      error => {
        console.error('Error accepting order:', error);
      }
    );
  }

  assignDeliveryMan(orderId: number, deliveryManId?: number): void {
    if (deliveryManId !== undefined) {
      this.orderService.assignDeliveryManToOrder(orderId, deliveryManId).subscribe(() => {
        this.getAllNewOrders(); 
      });
    } else {
      console.error('Delivery man ID is undefined.');
    }
  }

}
