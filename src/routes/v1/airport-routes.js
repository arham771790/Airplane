import express from 'express';
import { createAirport, getAirports, getAirportWithId, destroyAirport, updateAirport } from '../../controllers/index.js';
import {validateAirportRequest} from "../../middlewares/airport-create-middleware.js"
const app = express();
const router = express.Router();

console.log("Inside airport routes");

// Routes for airport
router.post('/', validateAirportRequest, createAirport); // Create an airport
router.get('/', getAirports); // Get all airports
router.get('/:id', getAirportWithId); // Get a specific airport by ID
router.delete('/:id', destroyAirport); // Delete an airport by ID
router.put('/:id', updateAirport); // Update an airport by ID

export default router;
