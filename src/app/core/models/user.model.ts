export interface User {
  id: string;
  email: string;
  role: 'admin' | 'practician';
  firstName: string;
  lastName: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
}

export interface Establishment {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  practicianId: string;
  establishmentId: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}