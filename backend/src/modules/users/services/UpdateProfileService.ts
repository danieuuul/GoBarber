import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async run({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequestDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const userWithUpdatEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdatEmail && userWithUpdatEmail.id !== user_id) {
      throw new AppError('This e-mail is already being used.');
    }

    user.name = name;
    user.email = email;

    if (password) {
      if (!old_password) {
        throw new AppError(
          'You need to inform the old password in order to set a new password',
        );
      }

      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.userRepository.update(user);
  }
}

export default UpdateUserProfileService;
