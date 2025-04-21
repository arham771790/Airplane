import {
    createAirport as createAirportService,
    getAirports as getAirportsService,
    getAirportWithId as getAirportWithIdService,
    destroyAirport as destroyAirportService,
    updateAirport as updateAirportService,
  } from "../services/index.js";
  
  import { StatusCodes } from "http-status-codes";
  import { errorResponse, successResponse } from "../utils/common/index.js";
  import { Logger } from "../config/index.js";
  
  /**
   * POST: /airports
   * req-body: { name: "Airport Name", code: "AIR123", cityID: 1 }
   */
  export const createAirport = async (req, res) => {
    console.log("Inside createAirport controller");
  
    try {
      const airport = await createAirportService(req.body);
      return res.status(StatusCodes.CREATED).json(successResponse(airport));
    } catch (error) {
      return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(errorResponse("Something went wrong", error.explanation));
    }
  };
  
  /**
   * GET: /airports
   */
  export const getAirports = async (req, res) => {
    try {
      const airports = await getAirportsService();
      return res.status(StatusCodes.OK).json(successResponse(airports));
    } catch (error) {
      return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(errorResponse("Something went wrong", error.explanation));
    }
  };
  
  /**
   * GET: /airports/:id
   */
  export const getAirportWithId = async (req, res) => {
    try {
      const airport = await getAirportWithIdService(req.params.id);
      return res.status(StatusCodes.OK).json(successResponse(airport));
    } catch (error) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(errorResponse("Something went wrong while fetching the airport", error.explanation));
    }
  };
  
  /**
   * DELETE: /airports/:id
   */
  export const destroyAirport = async (req, res) => {
    try {
      const result = await destroyAirportService(req.params.id);
      return res.status(StatusCodes.OK).json(successResponse(result));
    } catch (error) {
      return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(errorResponse("Something went wrong while deleting the airport", error.explanation));
    }
  };
  
  /**
   * PUT: /airports/:id
   */
  export const updateAirport = async (req, res) => {
    try {
      const result = await updateAirportService(req.params.id, req.body);
      return res.status(StatusCodes.OK).json(successResponse(result));
    } catch (error) {
      return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(errorResponse("Something went wrong while updating the airport", error.explanation));
    }
  };
  