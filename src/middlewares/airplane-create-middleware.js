import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common/index.js";

export const validateRequest = (req, res, next) => {
  const missingFields = [];

  if (!req.body.modelNumber) missingFields.push("modelNumber");
  if (!req.body.capacity) missingFields.push("capacity");

  if (missingFields.length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(errorResponse(`Missing required fields: ${missingFields.join(", ")}`));
  }

  next();
};
