import express from 'express';
 
import airplaneRoutes from '../v1/airplane-routes.js';
import { validateRequest } from '../../middlewares/airplane-create-middleware.js';
const router = express.Router();

router.use('/airplane', validateRequest,airplaneRoutes);

export default router;
