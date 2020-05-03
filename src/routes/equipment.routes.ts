import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateEquipmentService from '../services/CreateEquipmentService';
import equipmentRepository from '../repositories/EquipmentRepository';

const equipmentRouter = Router();

equipmentRouter.post('/', async (request, response) => {
  const { partnumber, serial } = request.body;

  const createEquipment = new CreateEquipmentService();

  const equipment = await createEquipment.execute({ partnumber, serial });

  return response.json(equipment);
});

equipmentRouter.get('/', async (request, response) => {
  const { scan } = request.query;

  const equiRepository = getCustomRepository(equipmentRepository);

  const equipment = await equiRepository.findByScan({ scan: scan.toString() });

  return response.json(equipment);
});

equipmentRouter.get('/', async (request, response) => {
  const equiRepository = getCustomRepository(equipmentRepository);

  const equipments = await equiRepository.find();

  return response.json(equipments);
});

export default equipmentRouter;
