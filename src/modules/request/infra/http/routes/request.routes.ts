import { Router } from 'express';
import RequestsController from '@modules/request/infra/http/controllers/RequestsController';

const requestsRouter = Router();
const requestsController = new RequestsController();

requestsRouter.post('/', requestsController.create);
requestsRouter.put('/', requestsController.update);
requestsRouter.get('/:request_id', requestsController.show);

export default requestsRouter;
