import { Router } from 'express';
import { UserController } from '../../controllers';
import { Result } from '../middleware/Result';
let svRouter = new Router();

svRouter.post('/', Result(UserController.createUser));
svRouter.get('/', Result(UserController.getListUser));
svRouter.put('/', Result(UserController.updateUser));
svRouter.delete('/', Result(UserController.deleteUser));

export default svRouter;