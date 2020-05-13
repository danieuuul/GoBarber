import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IRequestDTO {
  user_id: string;
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async run({ user_id }: IRequestDTO): Promise<User[]> {
    const providers = await this.userRepository.findAllProviders({
      except_user_id: user_id,
    });
    return providers;
  }
}
