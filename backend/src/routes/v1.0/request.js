import { Router } from 'express';
import { RequestController } from '../../controllers';
import { Result } from '../middleware/Result';
const redis_data = require('../middleware/redis_data')
let svRouter = new Router();

svRouter.post('/', Result(RequestController.createRequest));
svRouter.get('/', redis_data, Result(RequestController.getListRequest));
svRouter.put('/', Result(RequestController.updateRequest));
svRouter.delete('/', Result(RequestController.deleteRequest));
svRouter.get('/:id', Result(RequestController.getRequestById));

export default svRouter;