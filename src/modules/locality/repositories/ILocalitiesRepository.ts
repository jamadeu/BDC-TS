import ICreateLocalityDTO from '@modules/locality/dtos/ICreateLocalityDTO';
import Locality from '@modules/locality/infra/typeorm/entities/Locality';

export default interface ILocalitiesRespository {
  create(data: ICreateLocalityDTO): Promise<Locality>;
  update(locality: Locality): Promise<Locality>;
  findById(locality_id: number): Promise<Locality | undefined>;
  findByLocality(locality: string): Promise<Locality | undefined>;
  list(): Promise<Locality[]>;
}
