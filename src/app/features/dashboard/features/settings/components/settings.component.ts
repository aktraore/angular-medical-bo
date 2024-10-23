import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputSwitchModule,
    DropdownModule
  ],
  template: `
    <div class="card">
      <h2>Settings</h2>
      
      <form [formGroup]="settingsForm" class="p-fluid">
        <div class="grid">
          <div class="col-12">
            <h3>Notifications</h3>
            <div class="field-checkbox mb-4">
              <label>
                Email Notifications
                <p-inputSwitch formControlName="emailNotifications"></p-inputSwitch>
              </label>
            </div>
            
            <div class="field-checkbox mb-4">
              <label>
                SMS Notifications
                <p-inputSwitch formControlName="smsNotifications"></p-inputSwitch>
              </label>
            </div>
            
            <div class="field-checkbox mb-4">
              <label>
                Browser Notifications
                <p-inputSwitch formControlName="browserNotifications"></p-inputSwitch>
              </label>
            </div>
          </div>
          
          <div class="col-12">
            <h3>Language</h3>
            <div class="field mb-4">
              <label for="language">Select Language</label>
              <p-dropdown id="language" 
                formControlName="language"
                [options]="languages"
                optionLabel="name"
                optionValue="value">
              </p-dropdown>
            </div>
          </div>
        </div>

        <div class="flex justify-content-end">
          <p-button label="Save Changes" (onClick)="saveSettings()" styleClass="p-button-primary"></p-button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .card {
      background: #ffffff;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2);
    }
    .field-checkbox {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: #F2F2F2;
      padding: 1rem;
      border-radius: 6px;
      margin-bottom: 1rem;
    }
    .field-checkbox label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      color: #2477BF;
    }
    h2, h3 {
      color: #2477BF;
    }
    :host ::ng-deep .p-button.p-button-primary {
      background: #2477BF;
      border-color: #2477BF;
    }
    :host ::ng-deep .p-button.p-button-primary:hover {
      background: #5FAAD9;
      border-color: #5FAAD9;
    }
    :host ::ng-deep .p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
      background: #2477BF;
    }
    :host ::ng-deep .p-dropdown:not(.p-disabled).p-focus {
      border-color: #2477BF;
      box-shadow: 0 0 0 1px #2477BF;
    }
  `]
})
export class SettingsComponent {
  settingsForm: FormGroup;
  
  languages = [
    { name: 'English', value: 'en' },
    { name: 'French', value: 'fr' },
    { name: 'Spanish', value: 'es' }
  ];

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      emailNotifications: [true],
      smsNotifications: [false],
      browserNotifications: [true],
      language: ['en']
    });
  }

  saveSettings() {
    if (this.settingsForm.valid) {
      console.log('Settings saved:', this.settingsForm.value);
      // Implement save logic
    }
  }
}