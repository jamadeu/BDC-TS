import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import AppError from '@shared/errors/AppErrors';

import User from '@modules/user/infra/typeorm/entities/User';

interface IRequest {
  id: number;
  login: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ id, login }: IRequest): Promise<User> {
    if (!login) {
      throw new AppError('Login invalid');
    }
    const userExistisById = await this.userRepository.findById(id);

    if (!userExistisById) {
      throw new AppError('User not found');
    }

    const userExistsByLogin = await this.userRepository.findByLogin(login);

    if (userExistsByLogin) {
      throw new AppError(`User ${login} already exists`);
    }

    const userUpdated = userExistisById;
    userUpdated.login = login.toUpperCase();
    await this.userRepository.update(userUpdated);

    return userUpdated;
  }
}
