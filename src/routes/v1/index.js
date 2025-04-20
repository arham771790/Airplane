import express from 'express';
 
import airplaneRoutes from '../v1/airplane-routes.js';

const router = express.Router();
console.log("inside routes");
router.use('/airplane',airplaneRoutes);

export default router;
