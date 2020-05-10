import { Router } from 'express';
import LocalitiesController from '@modules/locality/infra/http/controllers/LocalitiesController';

const localityRouter = Router();
const localitiesController = new LocalitiesController();

localityRouter.post('/', localitiesController.create);
localityRouter.get('/', localitiesController.index);
localityRouter.put('/:user_id', localitiesController.update);

export default localityRouter;
