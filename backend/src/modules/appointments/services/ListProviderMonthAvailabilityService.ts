import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
}

type IResponseDTO = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async run({
    provider_id,
    year,
    month,
  }: IRequestDTO): Promise<IResponseDTO> {
    const appointments = await this.appointmentRepository.findByMonthAndYearAndProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    const numberofDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberofDaysInMonth },
      (value, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}
