import { IOrderDTO } from './../../../Interface/IOrderDTO';
import { OrderService } from './../../../service/order.service';
import { IOrderTypeDTO } from './../../../Interface/IOrderTypeDTO';
import { BranchService } from './../../../service/branch.service';
import { IRegionGetDTO } from 'src/app/Interface/IRegionGetDTO';
import { GovernmentService } from './../../../service/government.service';
import { RegionService } from './../../../service/region.service';
import { Component, OnInit } from '@angular/core';
import { IGovernmentGetDTO } from 'src/app/Interface/IGovernmentGetDTO';
import { IBranchGetDTO } from 'src/app/Interface/IBranchGetDTO';
import { IShippingTimeDTO } from 'src/app/Interface/IShippingTimeDTO';
import { IPaymentTypeDTO } from 'src/app/Interface/IPaymentTypeDTO';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IOrderCostDTO } from 'src/app/Interface/IOrderCostDTO';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {Router } from '@angular/router';
import Swal from 'sweetalert2';

// import { ToastModule } from 'primeng/toast';
// import {BrowserAnimationsModule } from '@angular/platform-browser/animations'
// import {  MessageService } from 'primeng/api';

// import { ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-seller-add-order',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ProgressSpinnerModule],
  templateUrl: './seller-add-order.component.html',
  styleUrl: './seller-add-order.component.css',

  // encapsulation: ViewEncapsulation.None
})
export class SellerAddOrderComponent implements OnInit {
  isLoading: boolean = false;
  isShippingWeightCalculated: boolean = false;
  ShippingWeightCost: number | undefined;
  sellerId = Number(localStorage.getItem('userId')); // you need to get it from token
  //---------------------------------------------
  governments: IGovernmentGetDTO[] = [];
  regions: IRegionGetDTO[] = [];
  branches: IBranchGetDTO[] = [];
  shippingTypes: IShippingTimeDTO[] = [];
  orderTypes: IOrderTypeDTO[] = [];
  paymentTypes: IPaymentTypeDTO[] = [];
  //---------------------------------------------------------
  orderDate: IOrderDTO | undefined;

  orderForm = new FormGroup({
    customerName: new FormControl('', [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0](10|11|12|15)[0-9]{8}$/),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /[\w]{4,}[a-zA-Z0-9]{0,}\@(gmail|yahoo|hotmail)\.com$/
      ),
    ]),
    government: new FormControl(0, Validators.pattern(/^[1-9]{1}[0-9]*/)),
    region: new FormControl(0, Validators.pattern(/^[1-9]{1}[0-9]*/)),
    isShippedToVillage: new FormControl(false),
    address: new FormControl('', [Validators.required]),
    branch: new FormControl(0, Validators.pattern(/^[1-9]{1}[0-9]*/)),
    ordertype: new FormControl(0, Validators.pattern(/^[1-9]{1}[0-9]*/)),
    shippingType: new FormControl(0, Validators.pattern(/^[1-9]{1}[0-9]*/)),
    paymentType: new FormControl(0, Validators.pattern(/^[1-9]{1}[0-9]*/)),
    totalWeight: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[1-9]{1}[0-9]*/),
    ]),
    note: new FormControl(),
    orderCost: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[1-9]{1}[0-9]*/),
    ]),
    shippingCost: new FormControl(),
    villageName: new FormControl('', [Validators.required]),
  });

  get customerName() {
    return this.orderForm.controls.customerName;
  }
  get phone() {
    return this.orderForm.controls.phone;
  }
  get email() {
    return this.orderForm.controls.email;
  }
  get government() {
    return this.orderForm.controls.government;
  }
  get region() {
    return this.orderForm.controls.region;
  }
  get isShippedToVillage() {
    return this.orderForm.controls.isShippedToVillage;
  }
  get address() {
    return this.orderForm.controls.address;
  }
  get branch() {
    return this.orderForm.controls.branch;
  }
  get ordertype() {
    return this.orderForm.controls.ordertype;
  }
  get shippingType() {
    return this.orderForm.controls.shippingType;
  }
  get paymentType() {
    return this.orderForm.controls.paymentType;
  }
  get totalWeight() {
    return this.orderForm.controls.totalWeight;
  }
  get note() {
    return this.orderForm.controls.note;
  }
  get orderCost() {
    return this.orderForm.controls.orderCost;
  }
  get shippingCost() {
    return this.orderForm.controls.shippingCost;
  }
  get villageName() {
    return this.orderForm.controls.villageName;
  }

  constructor(
    private RegionService: RegionService,
    private GovernmentService: GovernmentService,
    private BranchService: BranchService,
    private OrderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.GovernmentService.getAll().subscribe({
      next: (data) => {
        this.governments = data;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.BranchService.getAllBranches().subscribe({
      next: (data) => {
        this.branches = data;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.OrderService.getOrderTypes().subscribe({
      next: (data) => {
        this.orderTypes = data;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.OrderService.getShippingTypes().subscribe({
      next: (data) => {
        this.shippingTypes = data;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.OrderService.getPaymentTypes().subscribe({
      next: (data) => {
        this.paymentTypes = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  governmentChanged(event: Event) {
    let target = event.target as HTMLInputElement;
    let governmentId = parseInt(target.value);
    // console.log(governmentId);
    if (governmentId != 0) {
      this.RegionService.GetRegionsByGovernrmnt(governmentId).subscribe({
        next: (data) => {
          this.regions = data;
          console.log(this.regions);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.regions = [];
    }
  }

  calculateShippingCost() {
    this.isLoading = true;

    setTimeout(() => {
      console.log('This message is displayed after 1 second.');
      // You can place any other code here that you want to execute after the delay
      if (
        this.ordertype.valid &&
        this.shippingType.valid &&
        this.region.valid &&
        this.totalWeight.valid
      ) {
        let orderCostDTO: IOrderCostDTO = {
          isShippedToVillage: Boolean(this.isShippedToVillage.value),
          orderType: Number(this.ordertype.value),
          weight: Number(this.totalWeight.value),
          regionId: Number(this.region.value),
          shippingType: Number(this.shippingType.value),
        };
        this.OrderService.calculateOrderCost(orderCostDTO).subscribe({
          next: (data) => {
            console.log(data);
            this.ShippingWeightCost = data;
          },
          error: (error) => {
            console.log(error);
          },
        });
        this.isShippingWeightCalculated = true;
      } else {
        this.isShippingWeightCalculated = false;
      }
      this.isLoading = false;
    }, 600);
  }

  addOrder() {
    if (this.orderForm.status == 'VALID') {
      Swal.fire({
        title: "Do you want to save the changes?",
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          let orderDTO: IOrderDTO = {
            customerName: String(this.customerName.value),
            customerPhone: String(this.phone.value),
            address: String(this.address.value),
            orderType: Number(this.ordertype.value),
            regionId: Number(this.region.value),
            isShippedToVillage: Boolean(this.isShippedToVillage.value),
            villageName: String(this.villageName.value),
            weight: Number(this.totalWeight.value),
            orderPrice: Number(this.orderCost.value),
            note: this.note.value,
            shippingType: Number(this.shippingType.value),
            paymentType: Number(this.paymentType.value),
            branchId: Number(this.branch.value),
            sellerId: this.sellerId,
          };

          this.OrderService.addOrder(orderDTO).subscribe({
            next: (data) => {
              console.log('order added successfully', data);
              this.orderForm.reset();
              this.router.navigate(['/seller/orders/','1']);
            },
            error: (error) => {
              console.log(error);
            },
          });
          console.log(orderDTO);
        } 
      });
  
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "complete required data",
        
      });
    }
  }
  //-------------------------------------------
}
