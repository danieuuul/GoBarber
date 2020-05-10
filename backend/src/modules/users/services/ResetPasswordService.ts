import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import UUIDv4 from 'uuid-v4-validator';

import AppError from '@shared/errors/AppError';
// import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

interface IRequestDTO {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async run({ token, password }: IRequestDTO): Promise<void> {
    if (!UUIDv4.validate(token)) {
      throw new AppError('Token in invalid format', 403);
    }

    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists.');
    }
    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.update(user);
  }
}

export default ResetPasswordService;
