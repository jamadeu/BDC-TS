import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';

import Request from '@modules/request/infra/typeorm/entities/Request';
import IRequestsRepository from '@modules/request/repositories/IRequestsRepository';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import ILocalitiesRepository from '@modules/locality/repositories/ILocalitiesRepository';
import IEquipmentsRepository from '@modules/equipment/repositories/IEquipmentsRepository';

interface IRequest {
  id: number;
  request_reference?: string;
  reserveds_date?: Date;
  seal?: string;
  expedition_date?: Date;
  invoice?: string;
  locality_id?: number;
  user_id?: number;
  equipments?: string[];
}
@injectable()
export default class UpdateRequestService {
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
    id,
    equipments,
    user_id,
    locality_id,
    request_reference,
    reserveds_date,
    seal,
    expedition_date,
    invoice,
  }: IRequest): Promise<Request> {
    const requestExists = await this.requestsRepository.findById(id);

    if (!requestExists) {
      throw new AppError('Request not found');
    }

    if (user_id) {
      const userExists = await this.usersRepository.findById(user_id);
      if (!userExists) {
        throw new AppError('User not found');
      } else {
        requestExists.user_id = user_id;
      }
    }

    if (locality_id) {
      const localityExists = await this.localitiesRepository.findById(
        locality_id,
      );
      if (!localityExists) {
        throw new AppError('User locality found');
      } else {
        requestExists.locality_id = locality_id;
      }
    }

    if (equipments && equipments.length > 0) {
      const assigns = await Promise.all(
        equipments.map(async equip => {
          const equipment = await this.equipmentsRepository.findByScan(equip);
          if (!equipment) {
            throw new AppError('Equipment not found');
          }
          return equipment;
        }),
      );
      requestExists.assigns = assigns;
    }

    if (request_reference) {
      requestExists.request_reference = request_reference.toUpperCase();
    }

    if (reserveds_date) {
      requestExists.reserveds_date = reserveds_date;
    }

    if (seal) {
      requestExists.seal = seal;
    }

    if (expedition_date) {
      requestExists.expedition_date = expedition_date;
    }

    if (invoice) {
      requestExists.invoice = invoice;
    }

    const requestUpdated = await this.requestsRepository.update(requestExists);

    return requestUpdated;
  }
}
