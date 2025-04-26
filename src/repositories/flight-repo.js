import { CrudRepo } from "./crud-repo.js";
import db from "../models/index.js";

export const FlightRepo = class extends CrudRepo {
  constructor() {
    super(db.Flight); // Correctly initialize with Flight model
  }

  async getAllFlights(filter) {
    try {
      const response = await db.Flight.findAll({
        where: filter,
      });
      return response;
    } catch (error) {
      console.error("Error fetching flights with filter:", error);
      throw error;
    }
  }
};
