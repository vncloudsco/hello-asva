import { Router } from 'express';
import v1 from './v1.0';
let svRouter = new Router();

svRouter.use('/meeyland/v1.0', v1);

export default svRouter;