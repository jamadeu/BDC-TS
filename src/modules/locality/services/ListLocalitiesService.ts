import { inject, injectable } from 'tsyringe';
import ILocalitiesRepository from '@modules/locality/repositories/ILocalitiesRepository';
import Locality from '@modules/locality/infra/typeorm/entities/Locality';

@injectable()
export default class ListLocalitiesService {
  constructor(
    @inject('LocalitiesRepository')
    private localitiesRepository: ILocalitiesRepository,
  ) {}

  public async execute(): Promise<Locality[]> {
    return this.localitiesRepository.list();
  }
}
