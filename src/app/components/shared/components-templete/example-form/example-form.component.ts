import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './example-form.component.html',
  styleUrl: './example-form.component.css'
})
export class ExampleFormComponent {

  exampleForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.exampleForm = this.fb.group({
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
    return this.exampleForm.controls;
  }

  onSubmit() {
    if (this.exampleForm.valid) {
      console.log('Form Submitted!', this.exampleForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
