import { Router } from 'express';

import userRouter from './user.routes';
import localityRouter from './locality.routes';
import equipmentRouter from './equipment.routes';
import requestRouter from './request.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/localities', localityRouter);
routes.use('/equipments', equipmentRouter);
routes.use('/requests', requestRouter);

export default routes;
