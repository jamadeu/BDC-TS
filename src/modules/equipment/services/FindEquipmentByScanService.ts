import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import Equipment from '@modules/equipment/infra/typeorm/entities/Equipment';
import IEquipmentsRepository from '@modules/equipment/repositories/IEquipmentsRepository';

interface IRequest {
  scan: string;
}
@injectable()
export default class CreateEquipmentService {
  constructor(
    @inject('EquipmentsRepository')
    private equipmentsRepository: IEquipmentsRepository,
  ) {}

  public async execute({ scan }: IRequest): Promise<Equipment> {
    if (!scan) {
      throw new AppError('Scan was not inform');
    }
    const equipmentExists = await this.equipmentsRepository.findByScan(scan);
    if (!equipmentExists) {
      throw new AppError('Equipment not found');
    }
    return equipmentExists;
  }
}
