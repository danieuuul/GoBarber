// import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it(`should be able to list providers`, async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jd@sample.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'John Tre',
      email: 'jt@sample.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'jq@sample.com',
      password: '123456',
    });

    const providers = await listProviders.run({
      user_id: loggedUser.id,
    });
    expect(providers).toEqual([user1, user2]);
  });
});
