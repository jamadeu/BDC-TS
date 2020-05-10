import { Router } from 'express';
import EquipmentsController from '@modules/equipment/infra/http/controllers/EquipmentsController';

const equipmentRouter = Router();
const equipmentController = new EquipmentsController();

equipmentRouter.post('/', equipmentController.create);
equipmentRouter.get('/', equipmentController.show);

export default equipmentRouter;
