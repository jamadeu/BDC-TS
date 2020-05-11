import ICreateRepository from '@modules/request/dtos/ICreateRequestDTO';
import Request from '@modules/request/infra/typeorm/entities/Request';

export default interface IRequestsRepository {
  create(date: ICreateRepository): Promise<Request>;
  update(request: Request): Promise<Request>;
  findById(id: number): Promise<Request | undefined>;
}
