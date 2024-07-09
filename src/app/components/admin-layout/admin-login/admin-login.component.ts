import { Component, TemplateRef, ViewChild } from '@angular/core';
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
import { AccountService } from '@service/account.service';
import { Router } from '@angular/router';
import { NgbdModalOptions } from '../../shared/small-modal/small-modal.component';
import { LogoIconComponent } from '../../../components/shared/logo-icon/logo-icon.component';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    FloatLabelModule,
    InputGroupModule,
    LogoIconComponent,
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  private modalOptions: NgbdModalOptions = new NgbdModalOptions();
  @ViewChild('content', { static: true }) myModal!: TemplateRef<any>;

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  value!: string;
  loginForm: FormGroup;

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

      console.log('username login called');

      this.accountService
        .loginWithUserName({ ...this.loginForm.value, rememberMe: true })
        .subscribe({
          next: (data) => {
            if (data != undefined) {
              localStorage.setItem('userId', data.id.toString());
              localStorage.setItem('userRole', data.role);
              localStorage.setItem('userToken', data.token);

              this.router.navigate(['/admin']);
            } else {
              this.modalOptions.openSm(this.myModal);
            }
          },
          error: (error) => {
            this.modalOptions.openSm(this.myModal);
          },
        });
    } else {
      this.modalOptions.openSm(this.myModal);
    }
  }
}
