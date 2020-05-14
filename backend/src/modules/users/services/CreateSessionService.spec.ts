import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionService from './CreateSessionService';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;

let createSession: CreateSessionService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();

    createSession = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new session', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jd@sample.com',
      password: '123456',
    });

    const response = await createSession.run({
      email: 'jd@sample.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to create a new session with non existing user', async () => {
    await expect(
      createSession.run({
        email: 'jd@sample.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new session with wrong password', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jd@sample.com',
      password: '123456',
    });

    await expect(
      createSession.run({
        email: 'jd@sample.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
