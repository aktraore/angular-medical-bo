import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastModule,
  ],
  providers: [MessageService],
  template: `
    <div class="login-container">
      <p-toast></p-toast>
      <p-card styleClass="login-card">
        <h2 class="text-center mb-4">Medical Back Office</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="field mb-4">
            <label for="email" class="block mb-2">Email</label>
            <input 
              id="email" 
              type="email" 
              pInputText 
              formControlName="email" 
              class="w-full"
              [ngClass]="{'ng-invalid ng-dirty': submitted && loginForm.get('email')?.errors}"
            >
            <small class="text-gray-600">Use test{{'@'}}test.com for demo</small>
          </div>
          
          <div class="field mb-4">
            <label for="phone" class="block mb-2">Phone (Optional)</label>
            <input 
              id="phone" 
              type="tel" 
              pInputText 
              formControlName="phone" 
              class="w-full"
            >
            <small class="text-gray-600">Any phone number works for demo</small>
          </div>

          <p-button 
            type="submit" 
            [label]="'Continue'"
            [loading]="loading"
            styleClass="w-full">
          </p-button>
        </form>
      </p-card>
    </div>
  `,
  styles: [
    `
    .login-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #f8f9fa;
      padding: 1rem;
    }
    .login-card {
      width: 100%;
      max-width: 30rem;
    }
    :host ::ng-deep .p-card {
      background: #ffffff;
      border-radius: 6px;
      box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12);
    }
    .field label {
      font-weight: 500;
      margin-bottom: 0.5rem;
      display: block;
    }
    .w-full {
      width: 100%;
    }
    .mb-4 {
      margin-bottom: 1rem;
    }
    .text-center {
      text-align: center;
    }
    .text-gray-600 {
      color: #666;
      font-size: 0.875rem;
    }
  `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.email]],
        phone: [''],
      },
      {
        validators: this.atLeastOneFieldValidator,
      }
    );
  }

  atLeastOneFieldValidator(group: FormGroup) {
    const email = group.get('email')?.value;
    const phone = group.get('phone')?.value;
    return email || phone ? null : { atLeastOneRequired: true };
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, phone } = this.loginForm.value;

      this.router.navigate(['/dashboard']);

      /*if (email) {
        this.authService.requestMagicLink(email).subscribe({
          next: () => {
            if (email === 'test@test.com') {
              this.router.navigate(['/dashboard']);
            } else {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Magic link sent! Check your email.'
              });
            }
            this.loading = false;
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to send magic link'
            });
            this.loading = false;
          }
        });
      } else if (phone) {
        this.authService.requestOtp(phone).subscribe({
          next: () => {
            this.authService.verifyOtp(phone, '123456').subscribe({
              next: () => {
                this.router.navigate(['/dashboard']);
                this.loading = false;
              }
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to send OTP'
            });
            this.loading = false;
          }
        });
      }*/
    }
  }
}
