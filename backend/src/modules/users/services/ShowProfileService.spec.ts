import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it(`should be able to show user profile`, async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jd@sample.com',
      password: '123456',
    });

    const profile = await showProfile.run({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('jd@sample.com');
  });

  it(`should not be able to show user profile from non-existing user`, async () => {
    expect(
      showProfile.run({
        user_id: 'non-existing-user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
