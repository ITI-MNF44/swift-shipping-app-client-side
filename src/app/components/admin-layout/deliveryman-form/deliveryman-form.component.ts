import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deliveryman-form',
  standalone: true,
  templateUrl: './deliveryman-form.component.html',
  styleUrls: ['./deliveryman-form.component.css'],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule]
})
export class DeliverymanFormComponent implements OnInit {
  deliverymanForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.deliverymanForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      branch: ['', Validators.required],
      governments: ['', Validators.required],
      address: ['', Validators.required],
      discountPercentage: ['', Validators.required],
      companyShare: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  get f() {
    return this.deliverymanForm.controls;
  }

  onSubmit() {
    if (this.deliverymanForm.valid) {
      console.log('Form Submitted!', this.deliverymanForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
