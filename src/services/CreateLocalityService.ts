import { getRepository } from 'typeorm';

import AppError from '../errors/AppErrors';

import Locality from '../models/Locality';

interface Request {
  locality: string;
}

export default class CreateLocalityService {
  public async execute({ locality }: Request): Promise<Locality> {
    if (!locality) {
      throw new AppError('Locality invalid');
    }

    const localityRepository = getRepository(Locality);

    const localityExists = await localityRepository.findOne(locality);

    if (localityExists) {
      throw new AppError(`Locality ${locality} already exists`);
    }

    const newLocality = localityRepository.create({
      locality: locality.toUpperCase(),
    });

    await localityRepository.save(newLocality);

    return newLocality;
  }
}
