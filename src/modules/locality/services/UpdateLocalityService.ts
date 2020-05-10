import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import ILocalitiesRepository from '@modules/locality/repositories/ILocalitiesRepository';
import Locality from '@modules/locality/infra/typeorm/entities//Locality';

interface IRequest {
  id: number;
  locality: string;
}
@injectable()
export default class UpdateLocalityService {
  constructor(
    @inject('LocalitiesRepository')
    private localitiesRepository: ILocalitiesRepository,
  ) {}

  public async execute({ id, locality }: IRequest): Promise<Locality> {
    if (!id) {
      throw new AppError('ID invalid');
    }

    if (!locality) {
      throw new AppError('Locality invalid');
    }

    const localityExistsById = await this.localitiesRepository.findById(id);

    if (!localityExistsById) {
      throw new AppError('Locality not found');
    }

    const localityExistByLocality = await this.localitiesRepository.findByLocality(
      locality,
    );
    if (localityExistByLocality) {
      throw new AppError(`Locality ${locality} already exists`);
    }

    const localityUpdated = localityExistsById;
    localityUpdated.locality = locality.toUpperCase();
    await this.localitiesRepository.update(localityUpdated);

    return localityUpdated;
  }
}
