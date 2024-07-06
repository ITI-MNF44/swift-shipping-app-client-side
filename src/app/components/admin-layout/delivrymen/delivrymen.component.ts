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
import { EmployeeService } from '@service/employee.service';
import { IEmployeeDTO } from 'src/app/Interface/IEmployeeDTO';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IBranchGetDTO } from 'src/app/Interface/IBranchGetDTO';
import { IEmployeeGetDTO } from 'src/app/Interface/IEmployeeGetDTO';
import { IDeliveryManDTO } from 'src/app/Interface/IDeliveryManDTO';
import { IDeliveryManGetDTO } from 'src/app/Interface/IDeliveryManGetDTO';
import { DeliveryManService } from '@service/delivery-man.service';
import { SelectItemGroup } from 'primeng/api';

interface City {
  name: string,
  code: string
}


@Component({
  selector: 'app-delivrymen',
  standalone: true,
  templateUrl: './delivrymen.component.html',
  styleUrl: './delivrymen.component.css',
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

  groupedCities!: SelectItemGroup[];

  selectedCities!: City[];
  constructor(
    private deliveryManService: DeliveryManService,
    private branchService: BranchService
  ) {
    this.groupedCities = [
      {
        label: 'Germany',
        value: 'de',
        items: [
          { label: 'Berlin', value: 'Berlin' },
          { label: 'Frankfurt', value: 'Frankfurt' },
          { label: 'Hamburg', value: 'Hamburg' },
          { label: 'Munich', value: 'Munich' }
        ]
      },
      {
        label: 'USA',
        value: 'us',
        items: [
          { label: 'Chicago', value: 'Chicago' },
          { label: 'Los Angeles', value: 'Los Angeles' },
          { label: 'New York', value: 'New York' },
          { label: 'San Francisco', value: 'San Francisco' }
        ]
      },
      {
        label: 'Japan',
        value: 'jp',
        items: [
          { label: 'Kyoto', value: 'Kyoto' },
          { label: 'Osaka', value: 'Osaka' },
          { label: 'Tokyo', value: 'Tokyo' },
          { label: 'Yokohama', value: 'Yokohama' }
        ]
      }
    ];

  }

  ngOnInit(): void {
    this.deliveryManService.getAllDeliveryMen().subscribe((deliverymen) => {
      this.deliverymen = deliverymen.map(deliveryman => ({
        ...deliveryman,
        // status: deliveryman.status ?? false
      }));
      this.loadBranches();
      this.loading = false;
    });
  }

  loadBranches(): void {
    this.branchService.getAllBranches().subscribe(
      (data: IBranchGetDTO[]) => {
        this.branches = data;
        // this.deliverymen = this.deliverymen.map(deliveryman => ({
        //   ...deliveryman,
        //   branchName: this.branches.find(branch => branch.id === deliveryman.branchId)?.name
        // }
        // ));
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


}
