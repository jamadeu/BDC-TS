import { getRepository, getCustomRepository } from 'typeorm';

import AppError from '../errors/AppErrors';

import Request from '../models/Request';
import Locality from '../models/Locality';
import User from '../models/User';
import equipmentRepository from '../repositories/EquipmentRepository';

interface RequestDTO {
  requestToCreate: string;
  user_id: number;
  locality_id: number;
  equipments: string[];
}

export default class CreateRequestService {
  public async execute({
    requestToCreate,
    user_id,
    locality_id,
    equipments,
  }: RequestDTO): Promise<Request> {
    const user = await getRepository(User).findOne({ where: { id: user_id } });

    if (!user) {
      throw new AppError('User not found');
    }

    const locality = await getRepository(Locality).findOne({
      where: { id: locality_id },
    });

    if (!locality) {
      throw new AppError('Locality not found');
    }

    if (equipments.length === 0) {
      throw new AppError('Equipment not found');
    }

    const equipRepository = getCustomRepository(equipmentRepository);

    const assigns = await Promise.all(
      equipments.map(eq => equipRepository.findByScan({ scan: eq })),
    );

    const requestRepository = getRepository(Request);

    const request = requestRepository.create({
      requestIdentification: requestToCreate,
      user_id,
      locality_id,
      reserveds_date: new Date(),
      assigns,
    });

    await requestRepository.save(request);

    return request;
  }
}
