import { container } from 'tsyringe';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UserRespository';
import ILocalitiesRepository from '@modules/locality/repositories/ILocalitiesRepository';
import LocalitiesRepository from '@modules/locality/infra/typeorm/repositories/LocalitiesRepository';
import IEquipmentsRepository from '@modules/equipment/repositories/IEquipmentsRepository';
import EquipmentsRepository from '@modules/equipment/infra/typeorm/repositories/EquipmentsRepository';
import IRequestsRepository from '@modules/request/repositories/IRequestsRepository';
import RequestsRepository from '@modules/request/infra/typeorm/repositories/RequestsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<ILocalitiesRepository>(
  'LocalitiesRepository',
  LocalitiesRepository,
);
container.registerSingleton<IEquipmentsRepository>(
  'EquipmentsRepository',
  EquipmentsRepository,
);
container.registerSingleton<IRequestsRepository>(
  'RequestsRepository',
  RequestsRepository,
);
