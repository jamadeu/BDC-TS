import { getRepository } from 'typeorm';

import AppError from '../errors/AppErrors';

import Locality from '../models/Locality';

interface Request {
  id: number;
  locality: string;
}

export default class UpdateLocalityService {
  public async execute({ id, locality }: Request): Promise<Locality> {
    if (!id) {
      throw new AppError('ID invalid');
    }

    if (!locality) {
      throw new AppError('Locality invalid');
    }

    const localityRepository = getRepository(Locality);

    const localityExistsById = await localityRepository.findOne(id);

    if (!localityExistsById) {
      throw new AppError('Locality not found');
    }

    const localityExistByLocality = await localityRepository.findOne(locality);
    if (localityExistByLocality) {
      throw new AppError(`Locality ${locality} already exists`);
    }

    const localityUpdated = localityExistsById;

    localityUpdated.locality = locality;

    await localityRepository.save(localityUpdated);

    return localityUpdated;
  }
}
