import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-seller-form',
    standalone: true,
    templateUrl: './seller-form.component.html',
    styleUrls: ['./seller-form.component.css'],
    imports: [CommonModule, ReactiveFormsModule, SidebarComponent]
})
export class SellerFormComponent {
    sellerForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.sellerForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            branch: ['', Validators.required],
            storeName: ['', Validators.required],
            address: ['', Validators.required],
            pickupCost: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            companyShare: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
        });
    }

    get f() {
        return this.sellerForm.controls;
    }

    onSubmit() {
        if (this.sellerForm.valid) {
            console.log(this.sellerForm.value);
        } else {
            console.log('Form is invalid');
        }
    }
}
