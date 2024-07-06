import { AccountService } from './../../../service/account.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    FloatLabelModule,
    InputGroupModule,
  ],
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.css',
})
export class EmployeeLoginComponent {
  value!: string;
  loginForm: FormGroup;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get userName() {
    return this.loginForm.controls['userName'].value;
  }
  get password() {
    return this.loginForm.controls['password'].value;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      if (this.emailRegex.test(this.userName)) {
        console.log('email login called');
        this.accountService
          .loginWithEmail({
            email: this.userName,
            password: this.password,
            rememberMe: true,
          })
          .subscribe({
            next: (data) => {
              localStorage.setItem('userId', data.id.toString());
              localStorage.setItem('userRole', data.role);
              localStorage.setItem('userToken', data.token);
              if (data.role == 'Employee') {
                this.router.navigate(['/employee']);
              } else if (data.role == 'DeliveryMan') {
                this.router.navigate(['/DeliveryMan']);
              } else if (data.role == 'Seller') {
                this.router.navigate(['/Seller']);
              }
            },
          });
      } else {
        console.log('username login called');

        this.accountService
          .loginWithUserName({ ...this.loginForm.value, rememberMe: true })
          .subscribe({
            next: (data) => {
              localStorage.setItem('userId', data.id.toString());
              localStorage.setItem('userRole', data.role);
              localStorage.setItem('userToken', data.token);
              if (data.role == 'Employee') {
                this.router.navigate(['/employee']);
              } else if (data.role == 'DeliveryMan') {
                this.router.navigate(['/DeliveryMan']);
              } else if (data.role == 'Seller') {
                this.router.navigate(['/Seller']);
              }
            },
          });
      }
    }
  }
}
