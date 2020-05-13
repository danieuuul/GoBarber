import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAppointmentsByMonthAndYearAndProviderDTO from '@modules/appointments/dtos/IFindAppointmentsByMonthAndYearAndProviderDTO';
import IFindAppointmentsByDayAndMonthAndYearAndProviderDTO from '@modules/appointments/dtos/IFindAppointmentsByDayAndMonthAndYearAndProviderDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByMonthAndYearAndProvider(
    data: IFindAppointmentsByMonthAndYearAndProviderDTO,
  ): Promise<Appointment[]>;
  findByDayAndMonthAndYearAndProvider(
    data: IFindAppointmentsByDayAndMonthAndYearAndProviderDTO,
  ): Promise<Appointment[]>;
}
