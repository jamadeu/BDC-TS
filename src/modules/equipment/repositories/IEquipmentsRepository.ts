import ICreateEquipmentDTO from '@modules/equipment/dtos/ICreateEquipmentDTO';
import Equipment from '@modules/equipment/infra/typeorm/entities/Equipment';

export default interface IEquipmentsRepository {
  create(date: ICreateEquipmentDTO): Promise<Equipment>;
  update(equipment: Equipment): Promise<Equipment>;
  findByScan(scan: string): Promise<Equipment | undefined>;
}
