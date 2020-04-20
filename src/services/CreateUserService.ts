import { getRepository } from 'typeorm';

import AppError from '../errors/AppErrors';

import User from '../models/User';

interface Request {
  login: string;
}

export default class CreateUserService {
  public async execute({ login }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const userExistis = await userRepository.findOne(login);

    if (userExistis) {
      throw new AppError('User already exists');
    }

    const user = userRepository.create({ login });

    await userRepository.save(user);

    return user;
  }
}
