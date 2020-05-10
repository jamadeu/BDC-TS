import { getRepository } from 'typeorm';

import Equipment from '@modules/equipment/infra/typeorm/entities/Equipment';
import AppErrors from '@shared/errors/AppErrors';

interface Request {
  partnumber: string;
  serial: string;
}

export default class CreateEquipmentService {
  public async execute({ partnumber, serial }: Request): Promise<Equipment> {
    if (!partnumber || !serial) {
      throw new AppErrors('Partnumber or serial invalid');
    }
    const partnumber_serial = `1S${partnumber}${serial}`.toUpperCase();

    const equipmentRepository = getRepository(Equipment);

    const equipmentExists = await equipmentRepository.findOne({
      where: { partnumber_serial },
    });

    if (equipmentExists) {
      throw new AppErrors('Equipment already exists');
    }

    const equipment = equipmentRepository.create({
      partnumber: partnumber.toUpperCase(),
      serial: serial.toUpperCase(),
      partnumber_serial,
    });

    await equipmentRepository.save(equipment);

    return equipment;
  }
}
