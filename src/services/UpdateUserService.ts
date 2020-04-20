import { getRepository } from 'typeorm';

import AppError from '../errors/AppErrors';

import User from '../models/User';

interface Request {
  id: number;
  login: string;
}

export default class UpdateUserService {
  public async execute({ id, login }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const userExistisById = await userRepository.findOne(id);

    if (!userExistisById) {
      throw new AppError('User not found');
    }

    const userExistisByLogin = await userRepository.findOne(login);

    if (!userExistisByLogin) {
      throw new AppError(`User ${login} already exists`);
    }

    const userUpdated = userExistisById;

    userUpdated.login = login;

    await userRepository.save(userUpdated);

    return userUpdated;
  }
}
