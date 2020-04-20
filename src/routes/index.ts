import { Router } from 'express';

import userRouter from './user.routes';
import localityRouter from './locality.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/localities', localityRouter);

export default routes;
