import { Router } from 'express';
import users from './users';
import news from './news';
import category from './category';
import request from './request';

let svRouter = new Router();

svRouter.use('/user', users);
svRouter.use('/news', news);
svRouter.use('/category', category);
svRouter.use('/request', request);

export default svRouter;