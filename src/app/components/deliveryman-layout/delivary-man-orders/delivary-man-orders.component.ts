import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeliveryManService } from '@service/delivery-man.service';
import { OrderStatus } from 'src/app/Enum/OrderStatus';
import { IOrderGetDTO } from 'src/app/Interface/IOrderGetDTO';

@Component({
  selector: 'app-delivary-man-orders',
  standalone: true,
  imports: [FormsModule],
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
    [OrderStatus.DeliveredToDeliveryMan]: 'With Delivery Man',
    [OrderStatus.CanNotBeReached]: "Can't Be Reached",
    [OrderStatus.Postponed]: 'Postponed',
    [OrderStatus.PartiallyDelivered]: 'Partially Delivered',
    [OrderStatus.CanceledByCustomer]: 'Canceled By Customer',
    [OrderStatus.RejectWithPayment]: 'Rejected & Paid',
    [OrderStatus.RejectWithoutPayment]: 'Rejected & Not Paid',
    [OrderStatus.RejectWithPartiallyPaid]: 'Rejected & Partially Paid',
  };

  constructor(private deliveryManService: DeliveryManService) {}
  ngOnInit(): void {
    this.deliveryManService.DeliveryManOrders.subscribe({
      next: (response) => {
        this.orders = response;
        console.log(this.orders);
        this.orderStatusKeys = Object.keys(this.orderStatuses)
          .filter((key) => !isNaN(Number(key)))
          .map((key) => Number(key));
      },
      error: (error) => {},
      complete: () => {},
    });
  }

  getStatusLabel(status: OrderStatus): string {
    return this.OrderStatusStrings[status];
  }
}
