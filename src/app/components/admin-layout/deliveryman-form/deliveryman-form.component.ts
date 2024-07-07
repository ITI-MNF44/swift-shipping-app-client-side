import { GovernmentService } from './../../../service/government.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeliveryManService } from '@service/delivery-man.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { IBranchGetDTO } from 'src/app/Interface/IBranchGetDTO';
import { BranchService } from '@service/branch.service';

@Component({
  selector: 'app-deliveryman-form',
  standalone: true,
  templateUrl: './deliveryman-form.component.html',
  styleUrls: ['./deliveryman-form.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class DeliverymanFormComponent implements OnInit, OnDestroy {
  deliverymanForm!: FormGroup;
  deliverymanId: any;
  deliveryman: any;
  subscriber: Subscription | undefined;
  routeSubscriber: Subscription | undefined;

  branches: IBranchGetDTO[] = [];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public deliverymanService: DeliveryManService,
    public governmentService: GovernmentService,
    public branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.deliverymanForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      userName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      branchId: [null, Validators.required],
      address: ['', Validators.required],

      // governments: ['', Validators.required],

      // discountPercentage: ['', Validators.required],
      // companyShare: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });

    this.loadBranches();

    this.routeSubscriber = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.deliverymanId = params['id'];
        if (this.deliverymanId != '0') {
          this.subscriber = this.deliverymanService
            .getDeliveryManById(this.deliverymanId)
            .subscribe({
              next: (data) => {
                this.deliveryman = data;
                this.deliverymanForm.patchValue(this.deliveryman);
              },
              error: (error) => {
                console.log(error);
              },
            });
        }
      },
    });
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

  ngOnDestroy(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
    if (this.routeSubscriber) {
      this.routeSubscriber.unsubscribe();
    }
  }

  deliverymanHandler() {
    if (this.deliverymanForm.valid) {
      if (this.deliverymanId == '0') {
        this.deliverymanService
          .registerDeliveryMan(this.deliverymanForm.value)
          .subscribe({
            next: () => {
              this.router.navigate(['admin/deliverymen']);
            },
            error: (error) => {
              console.log(error);
            },
          });
      } else {
        this.deliverymanService
          .updateDeliveryMan(this.deliverymanId, this.deliverymanForm.value)
          .subscribe({
            next: () => {
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

  get f() {
    return this.deliverymanForm.controls;
  }
}
