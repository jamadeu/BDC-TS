import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';

import User from '../models/User';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  const { login } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ login });

  return response.json(user);
});

userRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();

  return response.json(users);
});

userRouter.put('/:id', async (request, response) => {
  const id = parseInt(request.params.id, 10);
  const { login } = request.body;

  const updateUser = new UpdateUserService();

  const userUpdated = await updateUser.execute({ id, login });

  return response.json(userUpdated);
});

export default userRouter;
