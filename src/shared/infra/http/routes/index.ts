import { Router } from 'express';

import userRouter from '@modules/user/infra/http/routes/user.routes';
import localityRouter from '@modules/locality/infra/http/routes/locality.routes';
import equipmentRouter from '@modules/equipment/infra/http/routes/equipment.routes';
import requestRouter from '@modules/request/infra/http/routes/request.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/localities', localityRouter);
routes.use('/equipments', equipmentRouter);
routes.use('/requests', requestRouter);

export default routes;
