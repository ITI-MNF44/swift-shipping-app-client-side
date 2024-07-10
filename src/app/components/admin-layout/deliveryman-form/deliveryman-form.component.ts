import { GovernmentService } from './../../../service/government.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryManService } from '@service/delivery-man.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { IBranchGetDTO } from 'src/app/Interface/IBranchGetDTO';
import { BranchService } from '@service/branch.service';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItemGroup } from 'primeng/api';
import { RegionService } from '@service/region.service';
import { IRegionGetDTO } from 'src/app/Interface/IRegionGetDTO';
import { IGovernmentWithRegionsDTO } from 'src/app/Interface/IGovernmentWithRegionsDTO';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDeliveryManDTO } from 'src/app/Interface/IDeliveryManDTO';

@Component({
  selector: 'app-deliveryman-form',
  standalone: true,
  templateUrl: './deliveryman-form.component.html',
  styleUrls: ['./deliveryman-form.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, InputTextModule, TagModule,
    MultiSelectModule, DropdownModule,],
})
export class DeliverymanFormComponent implements OnInit, OnDestroy {
  deliverymanId: any;
  deliveryman: any;
  subscriber: Subscription | undefined;
  routeSubscriber: Subscription | undefined;

  branches: IBranchGetDTO[] = [];

  loading: boolean = true;
  searchValue: string | undefined;
  governments: IGovernmentWithRegionsDTO[] = [];
  groupedRegions: SelectItemGroup[] = [];
  selectedRegions: number[] = [];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private regionService: RegionService,
    public activatedRoute: ActivatedRoute,
    public deliverymanService: DeliveryManService,
    public governmentService: GovernmentService,
    public branchService: BranchService
  ) { }

  ngOnInit(): void {


    this.loadBranches();
    this.loadGovernmentsAndRegions();

    this.routeSubscriber = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.deliverymanId = params['id'];
        if (this.deliverymanId != '0') {
          this.subscriber = this.deliverymanService
            .getDeliveryManById(this.deliverymanId)
            .subscribe({
              next: (data) => {
                this.deliveryman = data;
                this.deliverymanForm.patchValue({
                  ...this.deliveryman,
                  branchId: data.branchId,
                  selectedRegions: data.selectedRegions || [],
                });
                // this.selectedRegions = this.deliverymanForm.controls['selectedRegions'].value;
              },
              error: (error) => {
                console.log(error);
              },
            });
        }
      },
    });
  }

  deliverymanForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    userName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    branchId: [null, Validators.required],
    address: ['', Validators.required],
    selectedRegions: [[], Validators.required],
  });

  get GetselectedRegions(){return this.deliverymanForm.controls.selectedRegions.value} 


  loadBranches(): void {
    this.branchService.getAllBranches().subscribe(
      (data: IBranchGetDTO[]) => {  this.branches = data; },
      (error) => { console.error('Error fetching branches', error);  }
    );
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

  ngOnDestroy(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
    if (this.routeSubscriber) {
      this.routeSubscriber.unsubscribe();
    }
  }

  deliverymanHandler() {
    console.log('Selected Regions:', this.GetselectedRegions);
    if (this.deliverymanForm.valid) {

      let deliverymanData: IDeliveryManDTO = {
        name: String(this.deliverymanForm.controls['name'].value),
        address: String(this.deliverymanForm.controls['address'].value),
        email: String(this.deliverymanForm.controls['email'].value),
        userName: String(this.deliverymanForm.controls['userName'].value),
        password: String(this.deliverymanForm.controls['password'].value),
        phoneNumber: String(this.deliverymanForm.controls['phoneNumber'].value),
        branchId: Number(this.deliverymanForm.controls['branchId'].value),
      }

      if (this.deliverymanId == '0') {
        this.deliverymanService.registerDeliveryMan(deliverymanData).subscribe({
            next: (response) => {console.log(response); this.assignRegions(response.id)},
            error: (error) => {console.log(error); },
          });
      } else {
        this.deliverymanService.updateDeliveryMan(this.deliverymanId, deliverymanData).subscribe({
            next: () => {
              this.assignRegions(this.deliverymanId);
              this.router.navigate(['admin/deliverymen']);
            },
            error: (error) => {
              console.log(error);
            },
          });
      }
    } else {
      console.log('Invalid form');
    }
  }

  assignRegions(deliveryManId: number) {
      console.log(deliveryManId, this.GetselectedRegions);
      this.deliverymanService.assignRegions({ "deliveryManId": deliveryManId, "regionIds": this.GetselectedRegions}).subscribe({
          next: (response) => {console.log('Regions assigned successfully'); },
          error: (error) => { console.error('Error assigning regions', error); }
        });
  }

  get f() {
    return this.deliverymanForm.controls;
  }
}
