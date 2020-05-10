import { getRepository, Repository } from 'typeorm';
import ILocalitiesRepository from '@modules/locality/repositories/ILocalitiesRepository';
import ICreateLocalityDTO from '@modules/locality/dtos/ICreateLocalityDTO';
import Locality from '../entities/Locality';

export default class LocalitiesRepository implements ILocalitiesRepository {
  private ormRepository: Repository<Locality>;

  constructor() {
    this.ormRepository = getRepository(Locality);
  }

  public async create({ locality }: ICreateLocalityDTO): Promise<Locality> {
    const newLocality = this.ormRepository.create({
      locality: locality.toUpperCase(),
    });
    await this.ormRepository.save(newLocality);
    return newLocality;
  }

  public async findById(id: number): Promise<Locality | undefined> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findByLocality(locality: string): Promise<Locality | undefined> {
    return this.ormRepository.findOne({
      where: { locality },
    });
  }

  public async update(locality: Locality): Promise<Locality> {
    return this.ormRepository.save(locality);
  }

  public async list(): Promise<Locality[]> {
    return this.ormRepository.find();
  }
}
