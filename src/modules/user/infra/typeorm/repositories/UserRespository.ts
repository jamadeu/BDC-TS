import { getRepository, Repository } from 'typeorm';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import User from '../entities/User';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ login }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      login: login.toUpperCase(),
    });
    await this.ormRepository.save(user);
    return user;
  }

  public async findById(id: number): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findByLogin(login: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { login },
    });
  }

  public async update(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async list(): Promise<User[]> {
    return this.ormRepository.find();
  }
}
