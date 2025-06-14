import express from 'express';
 
import airplaneRoutes from '../v1/airplane-routes.js';
import cityRoutes from '../v1/city-routes.js'
import airportRoutes from '../v1/airport-routes.js'
import flightRoutes from '../v1/flight-routes.js'
const router = express.Router();
console.log("inside routes");
router.use('/airplane',airplaneRoutes);
router.use('/city',cityRoutes);
router.use('/airport',airportRoutes);
router.use('/flights',flightRoutes);
export default router;
