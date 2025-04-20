import { StatusCodes } from "http-status-codes";
import AppError from "../error/app-error.js";
import { AirplaneRepo } from "../repositories/index.js";

const airplaneRepository = new AirplaneRepo();

export const createAirplane = async (data) => {
  console.log("Inside createAirplane service");

  try {
    const newAirplane = await airplaneRepository.create(data);
    return newAirplane;
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      // Extract validation error messages
        const explanatation=[];
       
        error.errors.forEach((err)=>{
            explanatation.push(err.message);
        })
      
      // Throw custom AppError with validation messages
      throw new AppError(explanatation, StatusCodes.BAD_REQUEST);
    }

    // Handle TypeError (or other unexpected errors)
    if (error.name === "TypeError") {
      throw new AppError("Cannot create airplane object", StatusCodes.INTERNAL_SERVER_ERROR);
    }

    
    throw new AppError;
  }
};
export const getAirplanes=async()=>{
 try{
  const airplanes=await airplaneRepository.getAll();
  return airplanes;
 }
 catch(error){
    throw new AppError('Cannot fetch data of all airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
 }
}
export const getAirplanewithId = async (id) => {
  try {
    const airplane = await airplaneRepository.get(id);

    if (!airplane) {
      throw new AppError(`No airplane found with id: ${id}`, StatusCodes.NOT_FOUND);
    }

    return airplane;
  } catch (error) {
    if (error instanceof AppError) {
      throw error; // rethrow without changing message
    }

    throw new AppError(
      'Failed to fetch airplane by id',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
// DELETE airplane
export const destroyAirplane = async (id) => {
  try {
    const deletedCount = await airplaneRepository.destroy({ where: { id } });

    if (!deletedCount) {
      throw new AppError(`No airplane found with id: ${id}`, StatusCodes.NOT_FOUND);
    }

    return { message: `Airplane deleted successfully with id :${id}` };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Failed to delete airplane", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// UPDATE airplane
export const updateAirplane = async (id, data) => {
  try {
    const updateResult = await airplaneRepository.update(id, data);

    if (updateResult[0] === 0) {
      throw new AppError(`No airplane found to update with id: ${id}`, StatusCodes.NOT_FOUND);
    }

    return { message: "Airplane updated successfully" };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Failed to update airplane", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};


