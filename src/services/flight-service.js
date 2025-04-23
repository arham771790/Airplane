import { FlightRepo } from "../repositories/index.js";
import { StatusCodes } from "http-status-codes";
import AppError from "../error/app-error.js";


const flightRepository = new FlightRepo();

/**
 * Create a new flight
 */
export const createFlight = async (data) => {
  console.log("Inside createFlight service");

  const requiredFields = [
    "flightNumber",
    "airplaneId",
    "departureAirportId",
    "arrivalAirportId",
    "arrivalTime",
    "departureTime",
    "price",
    "totalSeats",
  ];

  const missingFields = requiredFields.filter(field => !data[field]);

  if (missingFields.length > 0) {
    throw new AppError(
      `Missing required fields: ${missingFields.join(", ")}`,
      StatusCodes.BAD_REQUEST
    );
  }

  try {
    const newFlight = await flightRepository.create(data);
    return newFlight;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const explanation = error.errors.map(err => err.message);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw new AppError("Foreign key constraint failed. Ensure airplaneId and airport codes are valid.", StatusCodes.BAD_REQUEST);
    }
    console.log(error);
    throw new AppError("An unexpected error occurred while creating the flight", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Get all flights
 */
export const getFlights = async () => {
  try {
    return await flightRepository.getAll();
  } catch (error) {
    throw new AppError("Cannot fetch flight data", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Get flight by ID
 */
export const getFlightWithId = async (id) => {
  try {
    const flight = await flightRepository.get(id);
    if (!flight) {
      throw new AppError(`No flight found with id: ${id}`, StatusCodes.NOT_FOUND);
    }
    return flight;
  } catch (error) {
    throw new AppError("Failed to fetch flight by ID", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Delete flight by ID
 */
export const destroyFlight = async (id) => {
  try {
    const deletedCount = await flightRepository.destroy({ where: { id } });
    if (!deletedCount) {
      throw new AppError(`No flight found with id: ${id}`, StatusCodes.NOT_FOUND);
    }
    return { message: `Flight deleted successfully with id: ${id}` };
  } catch (error) {
    throw new AppError("Failed to delete flight", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Update flight by ID
 */
export const updateFlight = async (id, data) => {
  try {
    const updateResult = await flightRepository.update(id, data);
    if (updateResult[0] === 0) {
      throw new AppError(`No flight found to update with id: ${id}`, StatusCodes.NOT_FOUND);
    }
    return { message: "Flight updated successfully" };
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const explanation = error.errors.map(err => err.message);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw new AppError("Invalid foreign key(s) provided", StatusCodes.BAD_REQUEST);
    }

    throw new AppError("Failed to update flight", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
