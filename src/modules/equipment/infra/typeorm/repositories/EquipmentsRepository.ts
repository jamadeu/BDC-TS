import { getRepository, Repository, Like } from 'typeorm';
import IEquipmentsRepository from '@modules/equipment/repositories/IEquipmentsRepository';
import ICreateEquipmentDTO from '@modules/equipment/dtos/ICreateEquipmentDTO';
import Equipment from '@modules/equipment/infra/typeorm/entities/Equipment';

export default class EquipmentsRepository implements IEquipmentsRepository {
  private ormRepository: Repository<Equipment>;

  constructor() {
    this.ormRepository = getRepository(Equipment);
  }

  public async create({
    partnumber,
    serial,
    partnumber_serial,
  }: ICreateEquipmentDTO): Promise<Equipment> {
    const equipment = this.ormRepository.create({
      partnumber,
      serial,
      partnumber_serial,
    });
    await this.ormRepository.save(equipment);
    return equipment;
  }

  public async update(equipment: Equipment): Promise<Equipment> {
    return this.ormRepository.save(equipment);
  }

  public async findByScan(scan: string): Promise<Equipment | undefined> {
    const equipToFind = scan.toUpperCase().slice(1);
    return this.ormRepository.findOne({
      partnumber_serial: Like(`%${equipToFind}`),
    });
  }
}
