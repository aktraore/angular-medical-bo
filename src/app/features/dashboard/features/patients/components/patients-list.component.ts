import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../../../../../core/models/user.model';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="card">
      <div class="flex justify-content-between align-items-center mb-4">
        <h2>Patients</h2>
        <p-button icon="pi pi-plus" label="Add Patient" (onClick)="showDialog()"></p-button>
      </div>

      <p-table [value]="patients" [paginator]="true" [rows]="10" [responsive]="true">
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-patient>
          <tr>
            <td>{{patient.firstName}} {{patient.lastName}}</td>
            <td>{{patient.email}}</td>
            <td>{{patient.phone}}</td>
            <td>{{patient.dateOfBirth | date}}</td>
            <td>
              <div class="flex gap-2">
                <button pButton icon="pi pi-pencil" class="p-button-text" 
                  (click)="editPatient(patient)"></button>
                <button pButton icon="pi pi-trash" class="p-button-text p-button-danger" 
                  (click)="deletePatient(patient)"></button>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>

    <p-dialog 
      [(visible)]="dialogVisible" 
      [header]="editMode ? 'Edit Patient' : 'Add Patient'"
      [modal]="true"
      [style]="{width: '450px'}"
      [draggable]="false"
      [resizable]="false">
      <form [formGroup]="patientForm" (ngSubmit)="savePatient()" class="p-fluid">
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
          <label for="phone">Phone</label>
          <input pInputText id="phone" formControlName="phone" />
        </div>
        
        <div class="field mb-4">
          <label for="dateOfBirth">Date of Birth</label>
          <p-calendar id="dateOfBirth" formControlName="dateOfBirth"></p-calendar>
        </div>

        <div class="flex justify-content-end gap-2">
          <p-button type="button" label="Cancel" (onClick)="hideDialog()" 
            styleClass="p-button-text"></p-button>
          <p-button type="submit" label="Save" [disabled]="!patientForm.valid"></p-button>
        </div>
      </form>
    </p-dialog>
  `
})
export class PatientsListComponent implements OnInit {
  patients: Patient[] = [];
  dialogVisible = false;
  editMode = false;
  patientForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: [null, Validators.required]
    });
  }

  ngOnInit() {
    // Mock data
    this.patients = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        dateOfBirth: new Date('1990-01-01')
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '098-765-4321',
        dateOfBirth: new Date('1985-05-15')
      }
    ];
  }

  showDialog() {
    this.editMode = false;
    this.patientForm.reset();
    this.dialogVisible = true;
  }

  hideDialog() {
    this.dialogVisible = false;
    this.patientForm.reset();
  }

  editPatient(patient: Patient) {
    this.editMode = true;
    this.patientForm.patchValue(patient);
    this.dialogVisible = true;
  }

  deletePatient(patient: Patient) {
    // Implement delete logic
    this.patients = this.patients.filter(p => p.id !== patient.id);
  }

  savePatient() {
    if (this.patientForm.valid) {
      const patient = this.patientForm.value;
      if (this.editMode) {
        // Update existing patient
        const index = this.patients.findIndex(p => p.id === patient.id);
        if (index !== -1) {
          this.patients[index] = patient;
        }
      } else {
        // Add new patient
        patient.id = Date.now().toString();
        this.patients.push(patient);
      }
      this.hideDialog();
    }
  }
}