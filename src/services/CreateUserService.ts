import { getRepository } from 'typeorm';

import AppError from '../errors/AppErrors';

import User from '../models/User';

interface Request {
  login: string;
}

export default class CreateUserService {
  public async execute({ login }: Request): Promise<User> {
    if (!login) {
      throw new AppError('Login invalid');
    }

    const userRepository = getRepository(User);

    const userExistis = await userRepository.findOne(login);

    if (!userExistis) {
      throw new AppError(`User ${login} already exists`);
    }

    const user = userRepository.create({
      login: login.toUpperCase(),
    });

    await userRepository.save(user);

    return user;
  }
}
