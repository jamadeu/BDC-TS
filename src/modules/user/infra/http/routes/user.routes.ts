import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.create);
userRouter.get('/', userController.index);
userRouter.put('/:user_id', userController.update);

export default userRouter;
