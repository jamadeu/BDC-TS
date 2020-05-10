import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateLocalityService from '@modules/locality/services/CreateLocalityService';
import UpdateLocalityService from '@modules/locality/services/UpdateLocalityService';
import ListLocalitiesSercie from '@modules/locality/services/ListLocalitiesService';

export default class LocalitiesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { locality } = request.body;
    const createLocality = container.resolve(CreateLocalityService);
    const newLocality = await createLocality.execute({ locality });
    return response.json(newLocality);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { locality_id } = request.params;
    const { locality } = request.body;
    const updateLocality = container.resolve(UpdateLocalityService);
    const updatedLocality = await updateLocality.execute({
      id: parseInt(locality_id, 10),
      locality,
    });
    return response.json(updatedLocality);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listLocalities = container.resolve(ListLocalitiesSercie);
    const localities = await listLocalities.execute();
    return response.json(localities);
  }
}
