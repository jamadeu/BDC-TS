import { Router } from 'express';

import CreateRequestService from '../services/CreateRequestService';

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

export default requestRouter;
