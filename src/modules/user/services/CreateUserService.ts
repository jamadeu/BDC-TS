import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import User from '@modules/user/infra/typeorm/entities/User';

interface IRequest {
  login: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ login }: IRequest): Promise<User> {
    if (!login) {
      throw new AppError('Login invalid');
    }

    const userExists = await this.userRepository.findByLogin(login);

    if (userExists) {
      throw new AppError(`User ${login} already exists`);
    }

    const user = this.userRepository.create({
      login: login.toUpperCase(),
    });

    return user;
  }
}
