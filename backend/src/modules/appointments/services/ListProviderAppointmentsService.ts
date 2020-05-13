import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface IRequestDTO {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async run({
    provider_id,
    year,
    month,
    day,
  }: IRequestDTO): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findByDayAndMonthAndYearAndProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    return appointments;
  }
}
