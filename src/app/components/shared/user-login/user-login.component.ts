import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '@service/account.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { PasswordModule } from 'primeng/password';
import { NgbdModalOptions } from '../small-modal/small-modal.component';
import { LogoIconComponent } from '../logo-icon/logo-icon.component';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    FloatLabelModule,
    InputGroupModule,
    LogoIconComponent
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  private modalOptions: NgbdModalOptions = new NgbdModalOptions();
  @ViewChild('content', { static: true }) myModal!: TemplateRef<any>;

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
              if (data != undefined) {
                localStorage.setItem('userId', data.id.toString());
                localStorage.setItem('userRole', data.role);
                localStorage.setItem('userToken', data.token);

                if (data.role == 'Employee') {
                  this.router.navigate(['/employee']);
                } else if (data.role == 'DeliveryMan') {
                  this.router.navigate(['/deliveryman']);
                } else if (data.role == 'Seller') {
                  this.router.navigate(['/seller']);
                }
              } else {
                this.modalOptions.openSm(this.myModal);
              }
            },
            error: (error) => {
              console.log(error);
              this.modalOptions.openSm(this.myModal);
            },
          });
      } else {
        this.accountService
          .loginWithUserName({ ...this.loginForm.value, rememberMe: true })
          .subscribe({
            next: (data) => {
              if (data != undefined) {
                localStorage.setItem('userId', data.id.toString());
                localStorage.setItem('userRole', data.role);
                localStorage.setItem('userToken', data.token);

                if (data.role == 'Employee') {
                  this.router.navigate(['/employee']);
                } else if (data.role == 'DeliveryMan') {
                  this.router.navigate(['/deliveryman']);
                } else if (data.role == 'Seller') {
                  this.router.navigate(['/seller']);
                }
              } else {
                this.modalOptions.openSm(this.myModal);
              }
            },
            error: (error) => {
              console.log(error);
              this.modalOptions.openSm(this.myModal);
            },
          });
      }
    } else {
      console.log(this.loginForm);
      this.modalOptions.openSm(this.myModal);
    }
  }
}
