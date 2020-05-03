import { EntityRepository, Repository, getRepository, Like } from 'typeorm';

import AppError from '../errors/AppErrors';

import Equipment from '../models/Equipment';

interface Request {
  scan: string;
}

@EntityRepository(Equipment)
class EquipmentRepository extends Repository<Equipment> {
  public async findByScan({ scan }: Request): Promise<Equipment> {
    const equipToFind = scan.toUpperCase().slice(1);

    const equipmentRepository = getRepository(Equipment);

    const equipment = await equipmentRepository.findOne({
      partnumber_serial: Like(`%${equipToFind}`),
    });

    if (!equipment) {
      throw new AppError('Equipment not found');
    }

    return equipment;
  }
}

export default EquipmentRepository;
