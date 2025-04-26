import { FlightRepo } from "../repositories/index.js";
import { StatusCodes } from "http-status-codes";
import AppError from "../error/app-error.js";
import { utilityFunctions } from "../utils/index.js";
import { Op } from "sequelize";
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

  const { arrivalTime, departureTime } = data;

  if (utilityFunctions.helperFunctions.compareTime(arrivalTime, departureTime)) {
    // arrival > departure → invalid → throw error
    throw new AppError(
      "Arrival time cannot be later than departure time",
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
export const getFlights = async (query) => {
  let customFilter = {}; // Initialize the filter object to store dynamic filters
  console.log(query);

  // Filter based on trip (departure and arrival airports)
  if (query.trips) {
    const [departureAirportId, arrivalAirportId] = query.trips.split('-');
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;

    if (departureAirportId === arrivalAirportId) {
      throw new AppError("Arrival and destination airport cannot be the same", StatusCodes.BAD_REQUEST);
    }
  }

  // Filter based on price range in the format "minPrice-maxPrice"
  if (query.price) {
    const [minPrice, maxPrice] = query.price.split('-'); // Split the price range

    if (minPrice && maxPrice) {
      // If both minPrice and maxPrice are provided, filter based on the range
      customFilter.price = {
        [Op.between]: [parseInt(minPrice), parseInt(maxPrice)]
      };
    } else if (minPrice) {
      // If only minPrice is provided, filter for prices greater than or equal to minPrice
      customFilter.price = {
        [Op.gte]: parseInt(minPrice)
      };
    } else if (maxPrice) {
      // If only maxPrice is provided, filter for prices less than or equal to maxPrice
      customFilter.price = {
        [Op.lte]: parseInt(maxPrice)
      };
    } else {
      throw new AppError("Invalid price format. Use 'minPrice-maxPrice'.", StatusCodes.BAD_REQUEST);
    }
  }

  // Filter based on date range (departure and/or arrival date)
  if (query.departureDate) {
    customFilter.departureTime = {
      [Op.gte]: new Date(query.departureDate) // Filter flights with departure on or after the provided date
    };
  }

  if (query.arrivalDate) {
    customFilter.arrivalTime = {
      [Op.lte]: new Date(query.arrivalDate) // Filter flights with arrival on or before the provided date
    };
  }

  try {
    // Call the repository method with the custom filter to get flights
    return await flightRepository.getAllFlights(customFilter);
  } catch (error) {
    // Handle any error that occurs during the process
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
