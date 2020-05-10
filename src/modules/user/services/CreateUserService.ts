import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import User from '@modules/user/infra/typeorm/entities/User';

interface IRequest {
  login: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ login }: IRequest): Promise<User> {
    if (!login) {
      throw new AppError('Login invalid');
    }

    const userExists = await this.usersRepository.findByLogin(login);

    if (userExists) {
      throw new AppError(`User ${login} already exists`);
    }

    const user = this.usersRepository.create({
      login: login.toUpperCase(),
    });

    return user;
  }
}
