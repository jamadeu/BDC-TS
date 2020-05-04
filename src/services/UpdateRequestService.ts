import { getRepository, getCustomRepository } from 'typeorm';

import AppError from '../errors/AppErrors';

import Request from '../models/Request';
import Locality from '../models/Locality';
import User from '../models/User';
import equipmentRepository from '../repositories/EquipmentRepository';

interface RequestDTO {
  id: number;
  requestIdentification?: string;
  reserveds_date?: Date;
  seal?: string;
  expedition_date?: Date;
  invoice?: string;
  locality_id?: number;
  user_id?: number;
  equipments?: string[];
}

export default class UpdateRequestService {
  public async execute({
    id,
    equipments,
    user_id,
    locality_id,
    requestIdentification,
    reserveds_date,
    seal,
    expedition_date,
    invoice,
  }: RequestDTO): Promise<Request> {
    const requestRepository = getRepository(Request);
    const requestExists = await requestRepository.findOne({ where: { id } });

    if (!requestExists) {
      throw new AppError('Request not found');
    }

    if (user_id) {
      const userExists = await getRepository(User).findOne({
        where: { id: user_id },
      });

      if (!userExists) {
        throw new AppError('User not found');
      } else {
        requestExists.user_id = user_id;
      }
    }

    if (locality_id) {
      const localityExists = await getRepository(Locality).findOne({
        where: { id: locality_id },
      });

      if (!localityExists) {
        throw new AppError('User locality found');
      } else {
        requestExists.locality_id = locality_id;
      }
    }

    if (equipments && equipments.length > 0) {
      const equipRepository = getCustomRepository(equipmentRepository);

      const assigns = await Promise.all(
        equipments.map(eq => equipRepository.findByScan({ scan: eq })),
      );

      requestExists.assigns = assigns;
    }

    if (requestIdentification) {
      requestExists.requestIdentification = requestIdentification.toUpperCase();
    }

    if (reserveds_date) {
      requestExists.reserveds_date = reserveds_date;
    }

    if (seal) {
      requestExists.seal = seal;
    }

    if (expedition_date) {
      requestExists.expedition_date = expedition_date;
    }

    if (invoice) {
      requestExists.invoice = invoice;
    }

    const requestUpdated = await requestRepository.save(requestExists);

    return requestUpdated;
  }
}
