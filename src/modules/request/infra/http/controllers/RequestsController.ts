import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateRequestService from '@modules/request/services/CreateRequestService';
import UpdateRequestService from '@modules/request/services/UpdateRequestService';
import FindRequestByIdService from '@modules/request/services/FindRequestByIdService';

export default class RequestColtroller {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      request_reference,
      user_id,
      locality_id,
      equipments,
    } = request.body;
    const createRequest = container.resolve(CreateRequestService);
    const CreatedRequest = await createRequest.execute({
      request_reference,
      user_id: parseInt(user_id, 10),
      locality_id: parseInt(locality_id, 10),
      equipments,
    });
    return response.json(CreatedRequest);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      id,
      request_reference,
      reserveds_date,
      seal,
      expedition_date,
      invoice,
      user_id,
      locality_id,
      equipments,
    } = request.body;
    const updateRequest = container.resolve(UpdateRequestService);
    const updatedRequest = await updateRequest.execute({
      id: parseInt(id, 10),
      request_reference,
      reserveds_date,
      seal,
      expedition_date,
      invoice,
      user_id: parseInt(user_id, 10),
      locality_id: parseInt(locality_id, 10),
      equipments,
    });
    return response.json(updatedRequest);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { request_id } = request.params;
    const findRequest = container.resolve(FindRequestByIdService);
    const foundedRequest = await findRequest.execute({
      request_id: parseInt(request_id, 10),
    });
    return response.json(foundedRequest);
  }
}
