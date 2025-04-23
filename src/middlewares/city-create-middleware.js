import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common/index.js";

export const validateCityRequest = (req, res, next) => {
  const missingFields = [];
  console.log("Request Body",req.body);
  if (!req.body.name) missingFields.push("name");

  if (missingFields.length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(errorResponse(`Missing required fields: ${missingFields.join(", ")}`));
  }

  next();
};
