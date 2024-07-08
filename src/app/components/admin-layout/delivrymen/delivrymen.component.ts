import { map } from 'rxjs';
import { BranchService } from '@service/branch.service';
import { TagModule } from 'primeng/tag';
import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IBranchGetDTO } from 'src/app/Interface/IBranchGetDTO';
import { IDeliveryManDTO } from 'src/app/Interface/IDeliveryManDTO';
import { IDeliveryManGetDTO } from 'src/app/Interface/IDeliveryManGetDTO';
import { DeliveryManService } from '@service/delivery-man.service';
import { SelectItemGroup } from 'primeng/api';
import { RegionService } from '@service/region.service';
import { IRegionGetDTO } from 'src/app/Interface/IRegionGetDTO';
import { IGovernmentWithRegionsDTO } from 'src/app/Interface/IGovernmentWithRegionsDTO';

@Component({
  selector: 'app-delivrymen',
  standalone: true,
  templateUrl: './delivrymen.component.html',
  styleUrls: ['./delivrymen.component.css'],
  imports: [
    TableModule, HttpClientModule, CommonModule, InputTextModule, TagModule,
    MultiSelectModule, DropdownModule, ButtonModule, FormsModule, RouterLink
  ]
})
  
export class DeliverymenComponent implements OnInit {
  deliverymen: IDeliveryManGetDTO[] = [];
  branches: IBranchGetDTO[] = [];
  deliveryman: IDeliveryManGetDTO | undefined;
  loading: boolean = true;
  searchValue: string | undefined;
  governments: IGovernmentWithRegionsDTO[] = [];
  groupedRegions: SelectItemGroup[] = [];
  selectedRegions: any[] = [];


  constructor(
    private deliveryManService: DeliveryManService,
    private branchService: BranchService, 
    private regionService: RegionService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.deliveryManService.getAllDeliveryMen().subscribe((deliverymen) => {
      this.deliverymen = deliverymen.map(deliveryman => ({
        ...deliveryman,
      }));
      this.loadBranches();
      this.loadGovernmentsAndRegions();
      this.loading = false;
    });
  }

  loadGovernmentsAndRegions(): void {
    this.regionService.getAllGovernmentsWithRegions().subscribe(
      (data: IGovernmentWithRegionsDTO[]) => {
        this.governments = data;
        this.groupedRegions = this.governments.map(gov => ({
          label: gov.name,
          value: gov.id,
          items: gov.regions.map((region: IRegionGetDTO) => ({
            label: region.name,
            value: region.id
          }))
        }));
      },
      (error) => {
        console.error('Error fetching governments and regions', error);
      }
    );
  }

  loadBranches(): void {
    this.branchService.getAllBranches().subscribe(
      (data: IBranchGetDTO[]) => {
        this.branches = data;
        console.log(this.branches);
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
