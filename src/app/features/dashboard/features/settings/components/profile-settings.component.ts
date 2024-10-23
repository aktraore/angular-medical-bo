import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FileUploadModule
  ],
  template: `
    <div class="card">
      <h2>Profile Settings</h2>
      
      <form [formGroup]="profileForm" class="p-fluid">
        <div class="grid">
          <div class="col-12 md:col-4">
            <div class="profile-image-container text-center">
              <img [src]="profileImage" alt="Profile" class="profile-image mb-3">
              <p-fileUpload mode="basic" 
                chooseLabel="Change Photo" 
                [auto]="true"
                accept="image/*"
                [maxFileSize]="1000000"
                (onSelect)="onImageSelect($event)"
                styleClass="p-button-outlined">
              </p-fileUpload>
            </div>
          </div>
          
          <div class="col-12 md:col-8">
            <div class="grid">
              <div class="col-12 md:col-6">
                <div class="field mb-4">
                  <label for="firstName">First Name</label>
                  <input pInputText id="firstName" formControlName="firstName" />
                </div>
              </div>
              
              <div class="col-12 md:col-6">
                <div class="field mb-4">
                  <label for="lastName">Last Name</label>
                  <input pInputText id="lastName" formControlName="lastName" />
                </div>
              </div>
            </div>
            
            <div class="field mb-4">
              <label for="email">Email</label>
              <input pInputText id="email" formControlName="email" type="email" />
            </div>
            
            <div class="field mb-4">
              <label for="phone">Phone</label>
              <input pInputText id="phone" formControlName="phone" />
            </div>
            
            <h3>Change Password</h3>
            
            <div class="field mb-4">
              <label for="currentPassword">Current Password</label>
              <p-password id="currentPassword" formControlName="currentPassword" 
                [feedback]="false" [toggleMask]="true"></p-password>
            </div>
            
            <div class="field mb-4">
              <label for="newPassword">New Password</label>
              <p-password id="newPassword" formControlName="newPassword"></p-password>
            </div>
            
            <div class="field mb-4">
              <label for="confirmPassword">Confirm New Password</label>
              <p-password id="confirmPassword" formControlName="confirmPassword" 
                [feedback]="false"></p-password>
            </div>
          </div>
        </div>

        <div class="flex justify-content-end">
          <p-button label="Save Changes" (onClick)="saveProfile()"></p-button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .profile-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
    }
    .profile-image-container {
      padding: 1rem;
    }
  `]
})
export class ProfileSettingsComponent implements OnInit {
  profileForm: FormGroup;
  profileImage = 'https://via.placeholder.com/150';

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
  }

  ngOnInit() {
    // Load user data
    this.profileForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '123-456-7890'
    });
  }

  onImageSelect(event: any) {
    if (event.files && event.files[0]) {
      const file = event.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    if (this.profileForm.valid) {
      console.log('Profile saved:', this.profileForm.value);
      // Implement save logic
    }
  }
}