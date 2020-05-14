import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
      fakeCacheProvider,
    );
  });

  it(`should be able to list provider's apppointments on a specific date`, async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      user_id: 'user1_id',
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentRepository.create({
      user_id: 'user2_id',
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });

    const appointment3 = await fakeAppointmentRepository.create({
      user_id: 'user3_id',
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    const appointments = await listProviderAppointments.run({
      provider_id: 'provider_id',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointment1, appointment2, appointment3]),
    );
  });
});
