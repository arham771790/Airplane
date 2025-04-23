export const validateFlightRequest = (req, res, next) => {
  const missingFields = [];
  console.log("Incoming request body:", req.body);

  const requiredFields = [
    "flightNumber",
    "airplaneId",
    "departureAirportId",
    "arrivalAirportId",
    "departureTime",
    "arrivalTime"
  ];

  requiredFields.forEach(field => {
    if (req.body[field] === undefined || req.body[field] === null) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    console.log("Missing fields:", missingFields);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(errorResponse(`Missing required fields: ${missingFields.join(", ")}`));
  }

  console.log("Validation passed");
  next();
};
