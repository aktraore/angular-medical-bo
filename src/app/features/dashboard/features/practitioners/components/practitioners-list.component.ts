import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../../core/models/user.model';

@Component({
  selector: 'app-practitioners-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="card">
      <div class="flex justify-content-between align-items-center mb-4">
        <h2>Practitioners</h2>
        <p-button icon="pi pi-plus" label="Add Practitioner" (onClick)="showDialog()"></p-button>
      </div>

      <p-table [value]="practitioners" [paginator]="true" [rows]="10" [responsive]="true">
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-practitioner>
          <tr>
            <td>{{practitioner.firstName}} {{practitioner.lastName}}</td>
            <td>{{practitioner.email}}</td>
            <td>{{practitioner.role}}</td>
            <td>
              <div class="flex gap-2">
                <button pButton icon="pi pi-pencil" class="p-button-text" 
                  (click)="editPractitioner(practitioner)"></button>
                <button pButton icon="pi pi-trash" class="p-button-text p-button-danger" 
                  (click)="deletePractitioner(practitioner)"></button>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>

    <p-dialog 
      [(visible)]="dialogVisible" 
      [header]="editMode ? 'Edit Practitioner' : 'Add Practitioner'"
      [modal]="true"
      [style]="{width: '450px'}"
      [draggable]="false"
      [resizable]="false">
      <form [formGroup]="practitionerForm" (ngSubmit)="savePractitioner()" class="p-fluid">
        <div class="field mb-4">
          <label for="firstName">First Name</label>
          <input pInputText id="firstName" formControlName="firstName" />
        </div>
        
        <div class="field mb-4">
          <label for="lastName">Last Name</label>
          <input pInputText id="lastName" formControlName="lastName" />
        </div>
        
        <div class="field mb-4">
          <label for="email">Email</label>
          <input pInputText id="email" formControlName="email" type="email" />
        </div>
        
        <div class="field mb-4">
          <label for="role">Role</label>
          <p-dropdown id="role" formControlName="role" [options]="roles"></p-dropdown>
        </div>

        <div class="flex justify-content-end gap-2">
          <p-button type="button" label="Cancel" (onClick)="hideDialog()" 
            styleClass="p-button-text"></p-button>
          <p-button type="submit" label="Save" [disabled]="!practitionerForm.valid"></p-button>
        </div>
      </form>
    </p-dialog>
  `
})
export class PractitionersListComponent implements OnInit {
  practitioners: User[] = [];
  dialogVisible = false;
  editMode = false;
  practitionerForm: FormGroup;
  roles = ['practician', 'admin'];

  constructor(private fb: FormBuilder) {
    this.practitionerForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['practician', Validators.required]
    });
  }

  ngOnInit() {
    // Mock data
    this.practitioners = [
      {
        id: '1',
        firstName: 'Dr. Gregory',
        lastName: 'House',
        email: 'house@example.com',
        role: 'practician'
      },
      {
        id: '2',
        firstName: 'Dr. James',
        lastName: 'Wilson',
        email: 'wilson@example.com',
        role: 'admin'
      }
    ];
  }

  showDialog() {
    this.editMode = false;
    this.practitionerForm.reset({ role: 'practician' });
    this.dialogVisible = true;
  }

  hideDialog() {
    this.dialogVisible = false;
    this.practitionerForm.reset({ role: 'practician' });
  }

  editPractitioner(practitioner: User) {
    this.editMode = true;
    this.practitionerForm.patchValue(practitioner);
    this.dialogVisible = true;
  }

  deletePractitioner(practitioner: User) {
    // Implement delete logic
    this.practitioners = this.practitioners.filter(p => p.id !== practitioner.id);
  }

  savePractitioner() {
    if (this.practitionerForm.valid) {
      const practitioner = this.practitionerForm.value;
      if (this.editMode) {
        // Update existing practitioner
        const index = this.practitioners.findIndex(p => p.id === practitioner.id);
        if (index !== -1) {
          this.practitioners[index] = practitioner;
        }
      } else {
        // Add new practitioner
        practitioner.id = Date.now().toString();
        this.practitioners.push(practitioner);
      }
      this.hideDialog();
    }
  }
}