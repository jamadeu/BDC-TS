import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateRequestService from '../services/CreateRequestService';
import UpdateRequestService from '../services/UpdateRequestService';
import Request from '../models/Request';

const requestRouter = Router();

requestRouter.post('/', async (request, response) => {
  const { requestToCreate, user_id, locality_id, equipments } = request.body;

  const createRequest = new CreateRequestService();

  const requestCreated = await createRequest.execute({
    requestToCreate,
    user_id,
    locality_id,
    equipments,
  });

  return response.json(requestCreated);
});

requestRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const updateRequest = new UpdateRequestService();

  const requestUpdated = await updateRequest.execute({ id, ...request.body });

  return response.json(requestUpdated);
});

requestRouter.get('/', async (request, response) => {
  const requests = await getRepository(Request).find();

  return response.json(requests);
});

export default requestRouter;
