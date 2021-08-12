import { Router } from 'express';
import { NewsController } from '../../controllers';
import { Result } from '../middleware/Result';
let svRouter = new Router();

svRouter.post('/', Result(NewsController.createNews));
svRouter.get('/', Result(NewsController.getListNews));
svRouter.put('/', Result(NewsController.updateNewsr));
svRouter.delete('/', Result(NewsController.deleteNews));

export default svRouter;