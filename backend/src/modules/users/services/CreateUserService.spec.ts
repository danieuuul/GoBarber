import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.run({
      name: 'John Doe',
      email: 'jd@sample.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an email that already exists', async () => {
    await createUser.run({
      name: 'John Doe',
      email: 'jd@sample.com',
      password: '123456',
    });

    await expect(
      createUser.run({
        name: 'John Doe',
        email: 'jd@sample.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
