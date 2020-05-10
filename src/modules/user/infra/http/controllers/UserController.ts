import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/user/services/CreateUserService';
import UpdateUserService from '@modules/user/services/UpdateUserService';
import ListUserService from '@modules/user/services/ListUserService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { login } = request.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ login });
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { login } = request.body;
    const updateUser = container.resolve(UpdateUserService);
    const updatedUser = await updateUser.execute({
      id: parseInt(user_id, 10),
      login,
    });
    return response.json(updatedUser);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = container.resolve(ListUserService);
    const users = await listUser.execute();
    return response.json(users);
  }
}
