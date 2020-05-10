import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErrors';
import Equipment from '@modules/equipment/infra/typeorm/entities/Equipment';
import IEquipmentsRepository from '@modules/equipment/repositories/IEquipmentsRepository';

interface IRequest {
  partnumber: string;
  serial: string;
}
@injectable()
export default class CreateEquipmentService {
  constructor(
    @inject('EquipmentsRepository')
    private equipmentsRepository: IEquipmentsRepository,
  ) {}

  public async execute({ partnumber, serial }: IRequest): Promise<Equipment> {
    if (!partnumber || !serial) {
      throw new AppError('Partnumber or serial invalid');
    }
    const partnumber_serial = `1S${partnumber}${serial}`.toUpperCase();
    const equipmentExists = await this.equipmentsRepository.findByScan(
      partnumber_serial,
    );
    if (equipmentExists) {
      throw new AppError('Equipment already exists');
    }

    const equipment = this.equipmentsRepository.create({
      partnumber: partnumber.toUpperCase(),
      serial: serial.toUpperCase(),
      partnumber_serial,
    });

    return equipment;
  }
}
