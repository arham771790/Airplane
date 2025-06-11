import { CrudRepo } from "./crud-repo.js";
import db from "../models/index.js";
import { Sequelize } from "sequelize";

export const FlightRepo = class extends CrudRepo {
  constructor() {
    super(db.Flight); // Correctly initialize with Flight model
  }

  async getAllFlights(filter,sort) {
    try {
      const response = await db.Flight.findAll({
        where: filter,
        order: sort,
        include: [
          {
            model: db.Airplane,
            required: true,
            as: "airplaneDetails", // Alias for Airplane association
            
          },
          {
            model: db.Airport,
            as: "DepartureAirportDetails", // Alias for departure airport
            required: true,
            on:{
              col1:Sequelize.where(Sequelize.col("Flight.departureAirportId"),"=",Sequelize.col("DepartureAirportDetails.code"))
            },
            include:
            {
              model:db.City,
              required:true,
            }
          },
          {
            model: db.Airport,
            as: "ArrivalAirportDetails", // Alias for arrival airport
            required: true,
            on:{
              col1:Sequelize.where(Sequelize.col("Flight.arrivalAirportId"),"=",Sequelize.col("ArrivalAirportDetails.code"))
            },
            include:
            {
              model:db.City,
              required:true,
            }
            
          }

        ]
      });
      console.log("Query Response:", response);
      return response;
    } catch (error) {
      console.error("Error fetching flights with filter:", error);
      throw error;
    }
  }
 async updateRemainingSeats(flightId, seats, dec = true) {
  console.log("oooUpdating remaining seats for flight:", flightId, "Seats:", seats, "Decrement:", dec);
  const targetFlight = await db.Flight.findByPk(flightId);

  if (!targetFlight) {
    throw new Error(`Flight with id ${flightId} not found`);
  }

  if (dec) {
    if (targetFlight.totalSeats < seats) {
      throw new Error(`Cannot decrement by ${seats}. Only ${targetFlight.totalSeats} seats available.`);
    }

    await targetFlight.decrement('totalSeats', {
      by: seats,
    });
  } else {
    await targetFlight.increment('totalSeats', {
      by: seats,
    });
  }
  await targetFlight.reload(); // Reload to get the updated totalSeats
  return targetFlight; // Return the updated flight object
} 
}
