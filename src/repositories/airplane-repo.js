import { CrudRepo } from "./crud-repo.js";
import db from "../models/index.js"; // ✅ Import initialized models

export const AirplaneRepo = class extends CrudRepo {
  constructor() {
    super(db.Airplane); // ✅ Pass the correctly loaded model
  }
};
