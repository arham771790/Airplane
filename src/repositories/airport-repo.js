import { CrudRepo } from "./crud-repo.js";
import db from "../models/index.js"; // ✅ Import initialized models

export const AirportRepo = class extends CrudRepo {
  constructor() {
    super(db.Airport); // ✅ Pass the Airport model
  }
};
