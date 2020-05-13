import { uuid } from 'uuidv4';
import { isEqual, getDate, getMonth, getYear } from 'date-fns';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import IFindAppointmentsByMonthAndYearAndProviderDTO from '@modules/appointments/dtos/IFindAppointmentsByMonthAndYearAndProviderDTO';
import IFindAppointmentsByDayAndMonthAndYearAndProviderDTO from '@modules/appointments/dtos/IFindAppointmentsByDayAndMonthAndYearAndProviderDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async create({
    user_id,
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(a => isEqual(a.date, date));
    return findAppointment;
  }

  public async findByMonthAndYearAndProvider({
    provider_id,
    month,
    year,
  }: IFindAppointmentsByMonthAndYearAndProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findByDayAndMonthAndYearAndProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAppointmentsByDayAndMonthAndYearAndProviderDTO): Promise<
    Appointment[]
  > {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }
}

export default AppointmentRepository;
