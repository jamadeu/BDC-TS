import { container } from 'tsyringe';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRespository';
import ILocalitiesRepository from '@modules/locality/repositories/ILocalitiesRepository';
import LocalitiesRepository from '@modules/locality/infra/typeorm/repositories/LocalitiesRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ILocalitiesRepository>(
  'LocalitiesRepository',
  LocalitiesRepository,
);
