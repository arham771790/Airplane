import {validateAirportRequest} from './airport-create-middleware.js';
import {validateRequest} from './airplane-create-middleware.js'
import { validateFlightRequest, validateFlightUpdateRequest } from './flight-create-middleware.js';
import { validateCityRequest } from './city-create-middleware.js';

export const middlewares={ validateAirportRequest,validateRequest,validateFlightRequest,validateCityRequest,validateFlightUpdateRequest};