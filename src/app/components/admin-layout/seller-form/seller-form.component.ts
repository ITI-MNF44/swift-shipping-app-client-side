import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SellersService } from '@service/seller.service';
import { ISellerGetDTO } from 'src/app/Interface/ISellerGetDTO';
import { IBranchGetDTO } from 'src/app/Interface/IBranchGetDTO';
import { BranchService } from '@service/branch.service';
import { RegionService } from '@service/region.service';
import { IRegionGetDTO } from 'src/app/Interface/IRegionGetDTO';

@Component({
  selector: 'app-seller-form',
  standalone: true,
  templateUrl: './seller-form.component.html',
  styleUrls: ['./seller-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SellerFormComponent implements OnInit, OnDestroy {
  sellerForm: FormGroup;
  sellerId: number = 0;
  private routeSubscriber: any;
  private subscriber: any;
  branches: IBranchGetDTO[] = [];
  regions: IRegionGetDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sellersService: SellersService,
    public branchService: BranchService,
    public regionService: RegionService
  ) {
    this.sellerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      userName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      branchId: ['', Validators.required],
      regionId: ['', Validators.required],
      storeName: ['', Validators.required],
      address: ['', Validators.required],
      // pickupCost: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      // companyShare: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  get f() {
    return this.sellerForm.controls;
  }

  ngOnInit(): void {
    this.routeSubscriber = this.activatedRoute.params.subscribe((params) => {
      this.sellerId = +params['id'];
      if (this.sellerId) {
        this.loadSellerData(this.sellerId);
      }
    });
    this.loadBranches();
    this.loadRegions();
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
  loadRegions(): void {
    this.regionService.getAllRegions().subscribe(
      (data: IRegionGetDTO[]) => {
        this.regions = data;
        console.log(this.regions);
      },
      (error) => {
        console.error('Error fetching regions', error);
      }
    );
  }

  loadSellerData(id: number): void {
    this.subscriber = this.sellersService.getSellerById(id).subscribe({
      next: (data: ISellerGetDTO) => {
        this.sellerForm.patchValue({
          ...data,
          branchId: data.branchId,
          regionId: data.regionId,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
    if (this.routeSubscriber) {
      this.routeSubscriber.unsubscribe();
    }
  }

  onSubmit() {
    if (this.sellerForm.valid) {
      if (this.sellerId) {
        this.sellersService
          .editSeller(this.sellerId, this.sellerForm.value)
          .subscribe({
            next: () => {
              console.log(this.sellerForm.value);
              this.router.navigate(['/admin/sellers']);
            },
            error: (error) => {
              console.log(error);
            },
          });
      } else {
        this.sellersService.addSeller(this.sellerForm.value).subscribe({
          next: () => {
            this.router.navigate(['/admin/sellers']);
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
}
