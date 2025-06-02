import {
  createFlight as createFlightService,
  getFlights as getFlightsService,
  getFlightWithId as getFlightByIdService,
  destroyFlight as destroyFlightService,
  updateFlight as updateFlightService,
  getFlight as getFlightService
} from "../services/index.js";

import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/common/index.js";

/**
 * POST: /flights
 * req-body: {
 *   flightNumber, airplaneId, departureAirportId, arrivalAirportId,
 *   arrivalTime, departureTime, price, boardingGate, totalSeats
 */
export const createFlight = async (req, res) => {
  try {
    const flight = await createFlightService(req.body);
    console.log(flight);
    return res.status(StatusCodes.CREATED).json(successResponse(flight));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse("Something went wrong while creating the flight", error.explanation));
  }
};

/**
 * GET: /flights
 */
export const getFlights = async (req, res) => {
  try {
    const flights = await getFlightsService(req.query); // pass query parameters
    return res.status(StatusCodes.OK).json(successResponse(flights));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(
          "Something went wrong while fetching flights",
          error.explanation || error.message
        )
      );
  }
};


/**
 * GET: /flights/:id
 */
export const getFlightById = async (req, res) => {
  try {
    const flight = await getFlightByIdService(req.params.id);
    return res.status(StatusCodes.OK).json(successResponse(flight));
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(errorResponse("Flight not found", error.explanation));
  }
};

/**
 * DELETE: /flights/:id
 */
export const destroyFlight = async (req, res) => {
  try {
    const result = await destroyFlightService(req.params.id);
    return res.status(StatusCodes.OK).json(successResponse(result));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse("Something went wrong while deleting the flight", error.explanation));
  }
};

/**
 * PUT / PATCH: /flights/:id
 */
export const updateFlight = async (req, res) => {
  try {
    const result = await updateFlightService(req.params.id, req.body);
    return res.status(StatusCodes.OK).json(successResponse(result));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse("Something went wrong while updating the flight", error.explanation));
  }
};
export const getFlight=async(req,res)=>{
  try {
    const flight = await getFlightService(req.params.id);
    return res.status(StatusCodes.OK).json(successResponse(flight));
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(errorResponse("Flight not found", error.explanation));
  }
}