import express from 'express';
 
import airplaneRoutes from '../v1/airplane-routes.js';
import cityRoutes from '../v1/city-routes.js'
const router = express.Router();
console.log("inside routes");
router.use('/airplane',airplaneRoutes);
router.use('/city',cityRoutes);
export default router;
