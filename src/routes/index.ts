import { Router } from 'express';

import userRouter from './user.routes';
import localityRouter from './locality.routes';
import equipmentRouter from './equipment.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/localities', localityRouter);
routes.use('/equipments', equipmentRouter);

export default routes;
