import { Appointment, DTOAppointment } from './appointment';

export class Calendar{
    id: string;
    appointments: DTOAppointment[];
    daysOff: Date[];
    workDays: Date[];
}