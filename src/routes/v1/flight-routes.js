import express from 'express';
import {
    createFlight,
    getFlights,
    getFlightById,
    updateFlight,
    destroyFlight
  } from '../../controllers/flights.controller.js';
 import {validateFlightRequest} from '../../middlewares/flight-create-middleware.js'

const router = express.Router();

router.post('/', validateFlightRequest, (req, res, next) => {
  console.log("Middleware passed. Body:", req.body);
  next();
}, createFlight);

// GET /flights - Get all flights
router.get('/', getFlights);

// GET /flights/:id - Get flight by ID
router.get('/:id', getFlightById);

// PATCH /flights/:id - Update flight by ID
router.patch('/:id', updateFlight);

// DELETE /flights/:id - Delete flight by ID
router.delete('/:id', destroyFlight);

export default router;
