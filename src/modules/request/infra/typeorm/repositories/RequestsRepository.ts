import { getRepository, Repository } from 'typeorm';
import IRequestsRepository from '@modules/request/repositories/IRequestsRepository';
import ICreateResquestDTO from '@modules/request/dtos/ICreateRequestDTO';
import Request from '@modules/request/infra/typeorm/entities/Request';

export default class RequestsRepository implements IRequestsRepository {
  private ormRepository: Repository<Request>;

  constructor() {
    this.ormRepository = getRepository(Request);
  }

  public async create({
    request_reference,
    user_id,
    locality_id,
    reserveds_date,
    assigns,
  }: ICreateResquestDTO): Promise<Request> {
    const request = this.ormRepository.create({
      request_reference,
      user_id,
      locality_id,
      reserveds_date,
      assigns,
    });
    await this.ormRepository.save(request);
    return request;
  }

  public async update(request: Request): Promise<Request> {
    return this.ormRepository.save(request);
  }

  public async findById(id: number): Promise<Request | undefined> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }
}
