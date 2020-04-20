import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateEquipmentService from '../services/CreateEquipmentService';
import Equipment from '../models/Equipment';

const equipmentRouter = Router();

equipmentRouter.post('/', async (request, response) => {
  const { partnumber, serial } = request.body;

  const createEquipment = new CreateEquipmentService();

  const equipment = await createEquipment.execute({ partnumber, serial });

  return response.json(equipment);
});

equipmentRouter.get('/', async (request, response) => {
  const equipmentRepository = getRepository(Equipment);

  const equipments = await equipmentRepository.find();

  return response.json(equipments);
});

export default equipmentRouter;
