import { Router } from 'express';
import { CategoryController } from '../../controllers';
import { Result } from '../middleware/Result';
let svRouter = new Router();

svRouter.post('/', Result(CategoryController.createCategory));
svRouter.get('/', Result(CategoryController.getListCategory));
svRouter.put('/', Result(CategoryController.updateCategoryr));
svRouter.delete('/', Result(CategoryController.deleteCategory));

export default svRouter;