import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfile: UpdateProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it(`should be able to update user profile`, async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jd@sample.com',
      password: '123456',
    });

    const updatedUser = await updateUserProfile.run({
      user_id: user.id,
      name: 'John Tre',
      email: 'jt@sample.com',
    });

    expect(updatedUser.name).toBe('John Tre');
    expect(updatedUser.email).toBe('jt@sample.com');
  });

  it(`should not be able to update user that does not exists`, async () => {
    expect(
      updateUserProfile.run({
        user_id: 'id-invalid',
        name: 'John Tre',
        email: 'jt@sample.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should not be able to change to an email that is already being used`, async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jod@sample.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'Jane Doe',
      email: 'jad@sample.com',
      password: '123456',
    });

    await expect(
      updateUserProfile.run({
        user_id: user.id,
        name: 'Jane Tre',
        email: 'jod@sample.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should be able to update password`, async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jd@sample.com',
      password: '123456',
    });

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const updatedUser = await updateUserProfile.run({
      user_id: user.id,
      name: 'John Doe',
      email: 'jd@sample.com',
      old_password: '123456',
      password: '111',
    });

    expect(generateHash).toHaveBeenCalledWith('111');
    expect(updatedUser.password).toBe('111');
  });

  it(`should not be able to update password without oldpassword`, async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jd@sample.com',
      password: '123456',
    });

    expect(
      updateUserProfile.run({
        user_id: user.id,
        name: 'John Doe',
        email: 'jd@sample.com',
        password: '111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should not be able to update password when oldpassword does not match`, async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jd@sample.com',
      password: '123456',
    });

    expect(
      updateUserProfile.run({
        user_id: user.id,
        name: 'John Doe',
        email: 'jd@sample.com',
        old_password: 'wrong-old-password',
        password: '111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
