
import { createAirplane,getAirplanes,getAirplanewithId,destroyAirplane,updateAirplane} from "../services/index.js";

import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/common/index.js";
import { Logger } from "../config/index.js";

/**
 * POST: /airplanes
 * req-body: { modelNumber: "asd520", capacity: 500 }
 */
export const createAeroplane = async (req, res) => {
  console.log("Inside createAeroplane controller");

  try {
    const airplane = await createAirplane(req.body);
    return res.status(StatusCodes.CREATED).json(successResponse(airplane));
  } catch (error) {
    
  
  return res
  .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
  .json(
    errorResponse(
    'Something went wrong',
    error.explanation
    )
  );
  }
};
/*
  GET : /airplanes
*/ 
export const getAeroPlanes=async(req,res)=>{
  try
  {
    const airplanes=await getAirplanes();
    return res.status(StatusCodes.OK).json(successResponse(airplanes));
  }
  catch(error)
  {
    return res
    .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(
      errorResponse(
      'Something went wrong',
      error.explanation
      )
    );
  }
}
/**
 * 
 * POST : /airplanes
 *  req-body: {req.params.id}
 * 
 */
export const getAeroPlanewithId = async (req, res) => {
  try {
    const airplane = await getAirplanewithId(req.params.id);

    return res.status(StatusCodes.OK).json(successResponse(airplane));
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(
        errorResponse(
          'Something went wrong while fetching the airplane',
          error.explanation
        )
      );
  }
};

//  DELETE : /airplanes
export const destroyAeroPlane = async (req, res) => {
  try {
    const result = await destroyAirplane(req.params.id);
    return res.status(StatusCodes.OK).json(successResponse(result));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse("Something went wrong while deleting the airplane", error.explanation));
  }
};

// PUT / PATCH : /airplanes
export const updateAeroPlane = async (req, res) => {
  try {
    const result = await updateAirplane(req.params.id, req.body);
    return res.status(StatusCodes.OK).json(successResponse(result));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse("Something went wrong while updating the airplane", error.explanation));
  }
};
