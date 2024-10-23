import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AppointmentFormComponent } from './appointment-form.component';
import { Appointment, Establishment } from '../../../../../core/models/user.model';

@Component({
  selector: 'app-appointments-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule,
    DialogModule,
    ButtonModule,
    AutoCompleteModule,
    AppointmentFormComponent
  ],
  template: `
    <div class="card">
      <div class="flex justify-content-between align-items-center mb-4">
        <h2>Appointments Calendar</h2>
        <div class="establishment-filter">
          <p-autoComplete
            [(ngModel)]="selectedEstablishment"
            [suggestions]="filteredEstablishments"
            (completeMethod)="filterEstablishments($event)"
            field="name"
            [dropdown]="true"
            [style]="{'width': '300px'}"
            placeholder="Select Establishment"
            (onSelect)="onEstablishmentSelect($event)"
            (onClear)="onEstablishmentClear()"
          >
            <ng-template let-establishment pTemplate="item">
              <div class="establishment-item">
                <span>{{establishment.name}}</span>
                <small>{{establishment.address}}</small>
              </div>
            </ng-template>
          </p-autoComplete>
        </div>
      </div>
      
      <div class="calendar-container">
        <full-calendar [options]="calendarOptions"></full-calendar>
      </div>
    </div>

    <p-dialog 
      [(visible)]="showAppointmentDialog" 
      [style]="{width: '450px'}" 
      [header]="selectedAppointment ? 'Edit Appointment' : 'New Appointment'"
      [modal]="true"
      [draggable]="false"
      [resizable]="false">
      <app-appointment-form
        [appointment]="selectedAppointment"
        [preselectedEstablishment]="selectedEstablishment"
        (save)="saveAppointment($event)"
        (cancel)="closeDialog()">
      </app-appointment-form>
    </p-dialog>
  `,
  styles: [`
    .calendar-container {
      background: #fff;
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
    }
    :host ::ng-deep .fc {
      max-width: 100%;
      height: calc(100vh - 300px);
    }
    .establishment-item {
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
    }
    .establishment-item small {
      color: #666;
      margin-top: 0.25rem;
    }
    h2 {
      color: #2477BF;
      margin: 0;
    }
    :host ::ng-deep .p-autocomplete {
      width: 100%;
    }
    :host ::ng-deep .p-autocomplete-input {
      border-color: #2477BF;
    }
    :host ::ng-deep .p-autocomplete:not(.p-disabled).p-focus > .p-autocomplete-input {
      border-color: #2477BF;
      box-shadow: 0 0 0 1px #2477BF;
    }
  `]
})
export class AppointmentsCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [] // Will be populated from service
  };

  showAppointmentDialog = false;
  selectedAppointment: Appointment | null = null;
  selectedEstablishment: Establishment | null = null;
  filteredEstablishments: Establishment[] = [];
  
  // Mock establishments data (should come from a service)
  establishments: Establishment[] = [
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

  // Mock appointments data (should come from a service)
  appointments: Appointment[] = [
    {
      id: '1',
      patientId: '1',
      practicianId: '1',
      establishmentId: '1',
      startTime: new Date('2024-01-20T10:00:00'),
      endTime: new Date('2024-01-20T11:00:00'),
      status: 'scheduled'
    },
    {
      id: '2',
      patientId: '2',
      practicianId: '2',
      establishmentId: '2',
      startTime: new Date('2024-01-21T14:00:00'),
      endTime: new Date('2024-01-21T15:00:00'),
      status: 'scheduled'
    }
  ];

  filterEstablishments(event: { query: string }) {
    const query = event.query.toLowerCase();
    this.filteredEstablishments = this.establishments.filter(establishment => 
      establishment.name.toLowerCase().includes(query) ||
      establishment.address.toLowerCase().includes(query)
    );
  }

  onEstablishmentSelect(establishment: Establishment) {
    this.selectedEstablishment = establishment;
    this.updateCalendarEvents();
  }

  onEstablishmentClear() {
    this.selectedEstablishment = null;
    this.updateCalendarEvents();
  }

  updateCalendarEvents() {
    let filteredAppointments = this.appointments;
    
    if (this.selectedEstablishment) {
      filteredAppointments = this.appointments.filter(
        appointment => appointment.establishmentId === this.selectedEstablishment?.id
      );
    }

    const events = filteredAppointments.map(appointment => ({
      id: appointment.id,
      title: `Appointment at ${this.getEstablishmentName(appointment.establishmentId)}`,
      start: appointment.startTime,
      end: appointment.endTime,
      extendedProps: appointment
    }));

    this.calendarOptions.events = events;
  }

  getEstablishmentName(id: string): string {
    return this.establishments.find(e => e.id === id)?.name || 'Unknown Location';
  }

  handleDateSelect(selectInfo: any) {
    this.selectedAppointment = null;
    this.showAppointmentDialog = true;
  }

  handleEventClick(clickInfo: any) {
    this.selectedAppointment = clickInfo.event.extendedProps as Appointment;
    this.showAppointmentDialog = true;
  }

  saveAppointment(appointment: Appointment) {
    if (this.selectedAppointment) {
      // Update existing appointment
      const index = this.appointments.findIndex(a => a.id === appointment.id);
      if (index !== -1) {
        this.appointments[index] = appointment;
      }
    } else {
      // Add new appointment
      appointment.id = Date.now().toString();
      this.appointments.push(appointment);
    }
    this.updateCalendarEvents();
    this.closeDialog();
  }

  closeDialog() {
    this.showAppointmentDialog = false;
    this.selectedAppointment = null;
  }

  ngOnInit() {
    this.updateCalendarEvents();
  }
}