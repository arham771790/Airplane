import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common/index.js";

export const validateRequest = (req, res, next) => {
  if (!req.body.modelNumber) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(errorResponse("Model number is required"));
  }

  next();
};
