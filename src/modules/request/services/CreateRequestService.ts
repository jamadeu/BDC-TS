import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';

import Request from '@modules/request/infra/typeorm/entities/Request';
import IRequestsRepository from '@modules/request/repositories/IRequestsRepository';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import ILocalitiesRepository from '@modules/locality/repositories/ILocalitiesRepository';
import IEquipmentsRepository from '@modules/equipment/repositories/IEquipmentsRepository';

interface IRequest {
  request_reference: string;
  user_id: number;
  locality_id: number;
  equipments: string[];
}

@injectable()
export default class CreateRequestService {
  constructor(
    @inject('RequestsRepository')
    private requestsRepository: IRequestsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('LocalitiesRepository')
    private localitiesRepository: ILocalitiesRepository,

    @inject('EquipmentsRepository')
    private equipmentsRepository: IEquipmentsRepository,
  ) {}

  public async execute({
    request_reference,
    user_id,
    locality_id,
    equipments,
  }: IRequest): Promise<Request> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const locality = await this.localitiesRepository.findById(locality_id);

    if (!locality) {
      throw new AppError('Locality not found');
    }

    if (equipments.length === 0) {
      throw new AppError('Equipment not found');
    }

    const assigns = await Promise.all(
      equipments.map(async equip => {
        const equipment = await this.equipmentsRepository.findByScan(equip);
        if (!equipment) {
          throw new AppError('Equipment not found');
        }
        return equipment;
      }),
    );

    const request = this.requestsRepository.create({
      request_reference: request_reference.toUpperCase(),
      user_id,
      locality_id,
      reserveds_date: new Date(),
      assigns,
    });
    return request;
  }
}
