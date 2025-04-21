import { StatusCodes } from "http-status-codes";
import AppError from "../error/app-error.js";
import { CityRepo } from "../repositories/index.js";

const cityRepository = new CityRepo();

// CREATE City
export const createCity = async (data) => {
  console.log("Inside createCity service");
  try {
    const newCity = await cityRepository.create(data);
    return newCity;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const explanation = error.errors.map(err => err.message);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    if (error.name === "TypeError") {
      throw new AppError("Cannot create city object", StatusCodes.INTERNAL_SERVER_ERROR);
    }

    throw new AppError("Unexpected error during city creation", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// GET all cities
export const getCities = async () => {
  try {
    const cities = await cityRepository.getAll();
    return cities;
  } catch (error) {
    throw new AppError("Cannot fetch cities", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// GET city by ID
export const getCityWithId = async (id) => {
  try {
    const city = await cityRepository.get(id);
    if (!city) {
      throw new AppError(`No city found with id: ${id}`, StatusCodes.NOT_FOUND);
    }
    return city;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Failed to fetch city by id", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// DELETE city
export const destroyCity = async (id) => {
  try {
    const deletedCount = await cityRepository.destroy({ where: { id } });
    if (!deletedCount) {
      throw new AppError(`No city found with id: ${id}`, StatusCodes.NOT_FOUND);
    }
    return { message: `City deleted successfully with id: ${id}` };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Failed to delete city", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// UPDATE city
export const updateCity = async (id, data) => {
  try {
    const updateResult = await cityRepository.update(id, data);
    if (updateResult[0] === 0) {
      throw new AppError(`No city found to update with id: ${id}`, StatusCodes.NOT_FOUND);
    }
    return { message: "City updated successfully" };
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.log(error);
    throw new AppError("Failed to update city", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
