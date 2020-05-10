import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateEquipmentService from '@modules/equipment/services/CreateEquipmentService';
import FindEquipmentByScanService from '@modules/equipment/services/FindEquipmentByScanService';

export default class EquipmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { serial, partnumber } = request.body;
    const createEquipment = container.resolve(CreateEquipmentService);
    const equipment = await createEquipment.execute({ serial, partnumber });
    return response.json(equipment);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const findByScan = container.resolve(FindEquipmentByScanService);
    const { scan } = request.query;
    const equipment = await findByScan.execute({ scan: String(scan) });
    return response.json(equipment);
  }
}
