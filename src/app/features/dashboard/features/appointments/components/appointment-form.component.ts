import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Appointment, Establishment } from '../../../../../core/models/user.model';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="p-fluid">
      <div class="field">
        <label for="patient">Patient</label>
        <p-dropdown
          id="patient"
          formControlName="patientId"
          [options]="patients"
          optionLabel="name"
          optionValue="id"
          [filter]="true"
          filterBy="name"
          placeholder="Select a patient">
        </p-dropdown>
      </div>

      <div class="field">
        <label for="practitioner">Practitioner</label>
        <p-dropdown
          id="practitioner"
          formControlName="practicianId"
          [options]="practitioners"
          optionLabel="name"
          optionValue="id"
          [filter]="true"
          filterBy="name"
          placeholder="Select a practitioner">
        </p-dropdown>
      </div>

      <div class="field">
        <label for="establishment">Establishment</label>
        <p-dropdown
          id="establishment"
          formControlName="establishmentId"
          [options]="establishments"
          optionLabel="name"
          optionValue="id"
          [filter]="true"
          filterBy="name"
          [disabled]="!!preselectedEstablishment"
          placeholder="Select an establishment">
        </p-dropdown>
      </div>

      <div class="field">
        <label for="startTime">Start Time</label>
        <p-calendar
          id="startTime"
          formControlName="startTime"
          [showTime]="true"
          [stepMinute]="15">
        </p-calendar>
      </div>

      <div class="field">
        <label for="endTime">End Time</label>
        <p-calendar
          id="endTime"
          formControlName="endTime"
          [showTime]="true"
          [stepMinute]="15">
        </p-calendar>
      </div>

      <div class="field">
        <label for="notes">Notes</label>
        <textarea
          id="notes"
          pInputTextarea
          formControlName="notes"
          rows="3">
        </textarea>
      </div>

      <div class="flex justify-content-end gap-2">
        <p-button
          type="button"
          label="Cancel"
          (click)="onCancel()"
          styleClass="p-button-text">
        </p-button>
        <p-button
          type="submit"
          label="Save"
          [disabled]="!form.valid">
        </p-button>
      </div>
    </form>
  `,
  styles: [`
    :host ::ng-deep .p-dropdown:not(.p-disabled).p-focus {
      border-color: #2477BF;
      box-shadow: 0 0 0 1px #2477BF;
    }
    :host ::ng-deep .p-calendar:not(.p-disabled).p-focus {
      border-color: #2477BF;
      box-shadow: 0 0 0 1px #2477BF;
    }
    :host ::ng-deep .p-inputtextarea:focus {
      border-color: #2477BF;
      box-shadow: 0 0 0 1px #2477BF;
    }
    label {
      color: #2477BF;
      font-weight: 500;
    }
  `]
})
export class AppointmentFormComponent implements OnInit {
  @Input() appointment: Appointment | null = null;
  @Input() preselectedEstablishment: Establishment | null = null;
  @Output() save = new EventEmitter<Appointment>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  
  // Mock data for demo
  patients = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' }
  ];
  
  practitioners = [
    { id: '1', name: 'Dr. House' },
    { id: '2', name: 'Dr. Wilson' }
  ];
  
  establishments = [
    { id: '1', name: 'Main Hospital' },
    { id: '2', name: 'Downtown Clinic' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      patientId: ['', Validators.required],
      practicianId: ['', Validators.required],
      establishmentId: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      notes: [''],
      status: ['scheduled']
    });
  }

  ngOnInit() {
    if (this.appointment) {
      this.form.patchValue(this.appointment);
    }
    
    if (this.preselectedEstablishment) {
      this.form.patchValue({
        establishmentId: this.preselectedEstablishment.id
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const appointment: Appointment = {
        ...this.form.value,
        id: this.appointment?.id
      };
      this.save.emit(appointment);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}