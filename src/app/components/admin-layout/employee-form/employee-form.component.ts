import { EmployeeService } from './../../../service/employee.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '@service/branch.service';
import { GovernmentService } from '@service/government.service';
import { Subscription } from 'rxjs';
import { IBranchGetDTO } from 'src/app/Interface/IBranchGetDTO';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  employeeForm!: FormGroup;
  employeeId: any;
  employee: any;
  subscriber: Subscription | undefined;
  routeSubscriber: Subscription | undefined;

  branches: IBranchGetDTO[] = [];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public employeeService: EmployeeService,
    public governmentService: GovernmentService,
    public branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      userName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      branchId: [null, Validators.required],
      address: ['', Validators.required],
    });

    this.loadBranches();

    this.routeSubscriber = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.employeeId = params['id'];
        if (this.employeeId != '0') {
          this.subscriber = this.employeeService
            .getById(this.employeeId)
            .subscribe({
              next: (data) => {
                this.employee = data;
                this.employeeForm.patchValue(this.employee);
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

  employeeHandler() {
    if (this.employeeForm.valid) {
      if (this.employeeId == '0') {
        this.employeeService.register(this.employeeForm.value).subscribe({
          next: () => {
            this.router.navigate(['/admin/employees']);
          },
          error: (error) => {
            console.log(error);
          },
        });
      } else {
        this.employeeService
          .updateEmployee(this.employeeId, this.employeeForm.value)
          .subscribe({
            next: () => {
              this.router.navigate(['/admin/employees']);
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
    return this.employeeForm.controls;
  }
}
