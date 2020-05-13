import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateAvatarService from './UpdateAvatarService';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateAvatar: UpdateAvatarService;

describe('UpdateAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateAvatar = new UpdateAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it(`should be able to update user's avatar`, async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jd@sample.com',
      password: '123456',
    });

    await updateAvatar.run({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateAvatar.run({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFileFunction = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jd@sample.com',
      password: '123456',
    });

    await updateAvatar.run({
      user_id: user.id,
      avatarFilename: 'oldAvatar.jpg',
    });

    await updateAvatar.run({
      user_id: user.id,
      avatarFilename: 'newAvatar.jpg',
    });

    expect(deleteFileFunction).toHaveBeenCalledWith('oldAvatar.jpg');
    expect(user.avatar).toBe('newAvatar.jpg');
  });
});
