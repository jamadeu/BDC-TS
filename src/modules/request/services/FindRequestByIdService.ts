import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import Request from '@modules/request/infra/typeorm/entities/Request';
import IRequestsRepository from '@modules/request/repositories/IRequestsRepository';

interface IRequest {
  request_id: number;
}

@injectable()
export default class FindRequestByIdService {
  constructor(
    @inject('RequestsRepository')
    private requestsRepository: IRequestsRepository,
  ) {}

  public async execute({ request_id }: IRequest): Promise<Request> {
    const requestExists = await this.requestsRepository.findById(request_id);
    if (!requestExists) {
      throw new AppError('Request not found');
    }
    return requestExists;
  }
}
