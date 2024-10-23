import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Establishment } from '../../../../../core/models/user.model';

@Component({
  selector: 'app-establishments-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="card">
      <div class="flex justify-content-between align-items-center mb-4">
        <h2>Establishments</h2>
        <p-button icon="pi pi-plus" label="Add Establishment" (onClick)="showDialog()"></p-button>
      </div>

      <p-table [value]="establishments" [paginator]="true" [rows]="10" [responsive]="true">
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-establishment>
          <tr>
            <td>{{establishment.name}}</td>
            <td>{{establishment.address}}</td>
            <td>{{establishment.phone}}</td>
            <td>{{establishment.email}}</td>
            <td>
              <div class="flex gap-2">
                <button pButton icon="pi pi-pencil" class="p-button-text" 
                  (click)="editEstablishment(establishment)"></button>
                <button pButton icon="pi pi-trash" class="p-button-text p-button-danger" 
                  (click)="deleteEstablishment(establishment)"></button>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>

    <p-dialog 
      [(visible)]="dialogVisible" 
      [header]="editMode ? 'Edit Establishment' : 'Add Establishment'"
      [modal]="true"
      [style]="{width: '450px'}"
      [draggable]="false"
      [resizable]="false">
      <form [formGroup]="establishmentForm" (ngSubmit)="saveEstablishment()" class="p-fluid">
        <div class="field mb-4">
          <label for="name">Name</label>
          <input pInputText id="name" formControlName="name" />
        </div>
        
        <div class="field mb-4">
          <label for="address">Address</label>
          <input pInputText id="address" formControlName="address" />
        </div>
        
        <div class="field mb-4">
          <label for="phone">Phone</label>
          <input pInputText id="phone" formControlName="phone" />
        </div>
        
        <div class="field mb-4">
          <label for="email">Email</label>
          <input pInputText id="email" formControlName="email" type="email" />
        </div>

        <div class="flex justify-content-end gap-2">
          <p-button type="button" label="Cancel" (onClick)="hideDialog()" 
            styleClass="p-button-text"></p-button>
          <p-button type="submit" label="Save" [disabled]="!establishmentForm.valid"></p-button>
        </div>
      </form>
    </p-dialog>
  `
})
export class EstablishmentsListComponent implements OnInit {
  establishments: Establishment[] = [];
  dialogVisible = false;
  editMode = false;
  establishmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.establishmentForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    // Mock data
    this.establishments = [
      {
        id: '1',
        name: 'Main Hospital',
        address: '123 Main St, City',
        phone: '123-456-7890',
        email: 'main@hospital.com'
      },
      {
        id: '2',
        name: 'Downtown Clinic',
        address: '456 Downtown Ave',
        phone: '098-765-4321',
        email: 'downtown@clinic.com'
      }
    ];
  }

  showDialog() {
    this.editMode = false;
    this.establishmentForm.reset();
    this.dialogVisible = true;
  }

  hideDialog() {
    this.dialogVisible = false;
    this.establishmentForm.reset();
  }

  editEstablishment(establishment: Establishment) {
    this.editMode = true;
    this.establishmentForm.patchValue(establishment);
    this.dialogVisible = true;
  }

  deleteEstablishment(establishment: Establishment) {
    // Implement delete logic
    this.establishments = this.establishments.filter(e => e.id !== establishment.id);
  }

  saveEstablishment() {
    if (this.establishmentForm.valid) {
      const establishment = this.establishmentForm.value;
      if (this.editMode) {
        // Update existing establishment
        const index = this.establishments.findIndex(e => e.id === establishment.id);
        if (index !== -1) {
          this.establishments[index] = establishment;
        }
      } else {
        // Add new establishment
        establishment.id = Date.now().toString();
        this.establishments.push(establishment);
      }
      this.hideDialog();
    }
  }
}