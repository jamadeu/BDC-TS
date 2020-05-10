import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import ILocalitiesRepository from '@modules/locality/repositories/ILocalitiesRepository';
import Locality from '@modules/locality/infra/typeorm/entities/Locality';

interface IRequest {
  locality: string;
}

@injectable()
export default class CreateLocalityService {
  constructor(
    @inject('LocalitiesRepository')
    private localitiesRepository: ILocalitiesRepository,
  ) {}

  public async execute({ locality }: IRequest): Promise<Locality> {
    if (!locality) {
      throw new AppError('Locality invalid');
    }
    const localityExists = await this.localitiesRepository.findByLocality(
      locality,
    );
    if (localityExists) {
      throw new AppError(`Locality ${locality} already exists`);
    }
    const newLocality = this.localitiesRepository.create({
      locality: locality.toUpperCase(),
    });
    return newLocality;
  }
}
