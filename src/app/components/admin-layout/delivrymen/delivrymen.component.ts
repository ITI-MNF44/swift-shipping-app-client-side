import { BranchService } from '@service/branch.service';
import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IBranchGetDTO } from 'src/app/Interface/IBranchGetDTO';
import { IDeliveryManGetDTO } from 'src/app/Interface/IDeliveryManGetDTO';
import { DeliveryManService } from '@service/delivery-man.service';

@Component({
  selector: 'app-delivrymen',
  standalone: true,
  templateUrl: './delivrymen.component.html',
  styleUrls: ['./delivrymen.component.css'],
  imports: [
    TableModule, HttpClientModule, CommonModule,
    ButtonModule, FormsModule, RouterLink
  ]
})

export class DeliverymenComponent implements OnInit {
  deliverymen: IDeliveryManGetDTO[] = [];
  branches: IBranchGetDTO[] = [];
  deliveryman: IDeliveryManGetDTO | undefined;
  loading: boolean = true;
  searchValue: string | undefined;


  constructor(
    private deliveryManService: DeliveryManService,
    private branchService: BranchService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.deliveryManService.getAllDeliveryMen().subscribe((deliverymen) => {
      this.deliverymen = deliverymen.map(deliveryman => ({
        ...deliveryman,
      }));
      this.loadBranches();
      this.loading = false;
    });
  }


  loadBranches(): void {
    this.branchService.getAllBranches().subscribe(
      (data: IBranchGetDTO[]) => {
        this.branches = data;
        // console.log(this.branches);
      },
      (error) => {
        console.error('Error fetching branches', error);
      }
    );
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  deleteDeliveryman(deliverymanId: number): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete this deliveryman?'
    );
    if (confirmDelete) {
      this.deliveryManService.deleteDeliveryMan(deliverymanId).subscribe(
        () => {
          this.route.navigateByUrl('admin/deliverymen');
          this.deliverymen = this.deliverymen.filter((deliveryman) => deliveryman.id !== deliverymanId);
        },
        (error) => {
          console.error('Error deleting deliveryman:', error);
        }
      );
    }
  }
}
