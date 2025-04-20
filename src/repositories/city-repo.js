import { CrudRepo } from "./crud-repo.js";
import db from "../models/index.js"; // ✅ Import initialized models

export const CityRepo = class extends CrudRepo {
  constructor() {
    super(db.City); // ✅ Pass the correctly loaded model
  }
};
