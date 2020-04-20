import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateLocalityService from '../services/CreateLocalityService';
import UpdateLocalityService from '../services/UpdateLocalityService';

import Locality from '../models/Locality';

const localityRouter = Router();

localityRouter.post('/', async (request, response) => {
  const { locality } = request.body;

  const createLocality = new CreateLocalityService();

  const newLocality = await createLocality.execute({ locality });

  return response.json(newLocality);
});

localityRouter.get('/', async (request, response) => {
  const localityRepository = getRepository(Locality);

  const localities = await localityRepository.find();

  return response.json(localities);
});

localityRouter.put('/:id', async (request, response) => {
  const id = parseInt(request.params.id, 10);
  const { locality } = request.body;

  const updateLocality = new UpdateLocalityService();

  const localityUpdated = await updateLocality.execute({ id, locality });

  return response.json(localityUpdated);
});

export default localityRouter;
