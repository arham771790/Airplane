import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common/index.js";

export const validateAirportRequest = (req, res, next) => {
  const missingFields = [];

  // Check if all required fields are present in the request body
  if (!req.body.name) missingFields.push("name");
  if (!req.body.code) missingFields.push("code");
  if (!req.body.cityID) missingFields.push("cityID");

  if (missingFields.length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(errorResponse(`Missing required fields: ${missingFields.join(", ")}`));
  }

  next();
};
