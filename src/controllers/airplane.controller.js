import { createAirplane } from "../services/airplane-service.js";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common/index.js";
import { Logger } from "../config/index.js";
/**
 * POST: /airplanes
 * req-body: {modelNumber:asd520, capacity:500} 
 */
export const createAeroplane = async (req, res) => {
    try {
        const airplane = await createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Airplane created successfully",
            data: airplane,
            error: {},
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            errorResponse(
                "Something went wrong while creating airplane",
                error.message,
                {}
            )
         );
    }
};
