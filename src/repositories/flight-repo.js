import { CrudRepo } from "./crud-repo.js";
import db from "../models/index.js"; // ✅ Import initialized models

export const FlightRepo = class extends CrudRepo {
  constructor() {
    super(db.Flight); // ✅ Pass the Airport model
  }
};
