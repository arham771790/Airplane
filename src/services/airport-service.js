import { AirportRepo } from "../repositories/index.js"; // Import the repository
import { StatusCodes } from "http-status-codes";
import AppError from "../error/app-error.js"; // Custom error handler

const airportRepository = new AirportRepo();

/**
 * Create a new airport
 */
export const createAirport = async (data) => {
  console.log("Inside createAirport service");

  try {
    // Check if city exists before creating an airport (ensure foreign key relationship)
    if (!data.cityID) {
      throw new AppError("City ID is required to create an airport", StatusCodes.BAD_REQUEST);
    }

    const newAirport = await airportRepository.create(data);
    return newAirport;
  } catch (error) {
    console.log(error.name);

    // Handle Sequelize validation errors
    if (error.name === "SequelizeValidationError") {
      const explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    // Handle foreign key constraint errors (invalid cityID, for example)
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw new AppError("The provided cityID does not exist in the database", StatusCodes.BAD_REQUEST);
    }

    // Handle other unexpected errors
    throw new AppError("An unexpected error occurred while creating the airport", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Get all airports
 */
export const getAirports = async () => {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError("Cannot fetch data of all airports", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Get airport by id
 */
export const getAirportWithId = async (id) => {
  try {
    const airport = await airportRepository.get(id);

    if (!airport) {
      throw new AppError(`No airport found with id: ${id}`, StatusCodes.NOT_FOUND);
    }

    return airport;
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      throw new AppError("Failed to fetch airport due to a database error", StatusCodes.INTERNAL_SERVER_ERROR);
    }

    throw new AppError("Failed to fetch airport by id", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Delete airport by id
 */
export const destroyAirport = async (id) => {
  try {
    const deletedCount = await airportRepository.destroy({ where: { id } });

    if (!deletedCount) {
      throw new AppError(`No airport found with id: ${id}`, StatusCodes.NOT_FOUND);
    }

    return { message: `Airport deleted successfully with id: ${id}` };
  } catch (error) {
    // Handle specific Sequelize errors during deletion
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw new AppError("This airport cannot be deleted because it has dependent records.", StatusCodes.BAD_REQUEST);
    }

    throw new AppError("Failed to delete airport", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Update airport by id
 */
export const updateAirport = async (id, data) => {
  try {
    // Ensure cityID is valid before updating
    if (data.cityID) {
      const cityExists = await db.City.findByPk(data.cityID);
      if (!cityExists) {
        throw new AppError("The provided cityID does not exist in the database", StatusCodes.BAD_REQUEST);
      }
    }

    const updateResult = await airportRepository.update(id, data);

    if (updateResult[0] === 0) {
      throw new AppError(`No airport found to update with id: ${id}`, StatusCodes.NOT_FOUND);
    }

    return { message: "Airport updated successfully" };
  } catch (error) {
    // Handle Sequelize validation or foreign key errors during update
    if (error.name === "SequelizeValidationError") {
      const explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw new AppError("The provided cityID is invalid", StatusCodes.BAD_REQUEST);
    }

    throw new AppError("Failed to update airport", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
