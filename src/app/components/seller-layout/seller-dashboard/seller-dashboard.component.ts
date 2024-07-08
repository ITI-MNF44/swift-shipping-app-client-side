import { OrderStatus } from './../../../Enum/OrderStatus';
import { Component, OnInit } from '@angular/core';
import { SellersService } from '@service/seller.service';
import { IEnumDTO } from 'src/app/Interface/IEnumDTO';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css',
})
export class SellerDashboardComponent implements OnInit {
  seller_orders_status: IEnumDTO[] = [];
  sellerId: number = Number(localStorage.getItem('userId'));

  constructor(
    public SellersService: SellersService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.SellersService.getAllOrdersStatusCount(this.sellerId).subscribe({
      next: (data) => {
        this.seller_orders_status = data;
        // console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  goToOrdersByStatusPage(statusId: number) {
    this.router.navigate(['/seller/orders', statusId]);
  }
}
