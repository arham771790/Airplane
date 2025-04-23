import {
  createCity as createCityService,
  getCities as getCitiesService,
  getCityWithId as getCityWithIdService,
  destroyCity as destroyCityService,
  updateCity as updateCityService,
} from "../services/index.js";

import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/common/index.js";
import { Logger } from "../config/index.js";

/**
 * POST: /cities
 * req-body: { name: "New York" }
 */
export const createCity = async (req, res) => {
  console.log("Inside createCity controller...");
  console.log("Controller city",req.body);

  try {
    const city = await createCityService(req.body);
    console.log("city lll",city);
    return res.status(StatusCodes.CREATED).json(successResponse(city));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse("Something went wrong", error.explanation));
  }
};

/**
 * GET: /cities
 */
export const getCities = async (req, res) => {
  try {
    const cities = await getCitiesService();
    return res.status(StatusCodes.OK).json(successResponse(cities));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse("Something went wrong", error.explanation));
  }
};

/**
 * GET: /cities/:id
 */
export const getCityWithId = async (req, res) => {
  try {
    const city = await getCityWithIdService(req.params.id);
    return res.status(StatusCodes.OK).json(successResponse(city));
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(errorResponse("Something went wrong while fetching the city", error.explanation));
  }
};

/**
 * DELETE: /cities/:id
 */
export const destroyCity = async (req, res) => {
  try {
    const result = await destroyCityService(req.params.id);
    return res.status(StatusCodes.OK).json(successResponse(result));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse("Something went wrong while deleting the city", error.explanation));
  }
};

/**
 * PUT: /cities/:id
 */
export const updateCity = async (req, res) => {
  try {
    const result = await updateCityService(req.params.id, req.body);
    return res.status(StatusCodes.OK).json(successResponse(result));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse("Something went wrong while updating the city", error.explanation));
  }
};
