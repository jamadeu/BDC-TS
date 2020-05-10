import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import User from '@modules/user/infra/typeorm/entities/User';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    return this.usersRepository.list();
  }
}
