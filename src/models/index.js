import { Sequelize } from "sequelize";
import configJson from "../config/config.json" assert { type: "json" };
import airplaneModel from "../models/airplane.js";
import cityModel from "../models/city.js";
import airportModel from "../models/airport.js";
import flightModel from "../models/flight.js";

const env = process.env.NODE_ENV || "development";
const config = configJson[env];

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Initialize models
db.Airplane = airplaneModel(sequelize, Sequelize.DataTypes);
db.City = cityModel(sequelize, Sequelize.DataTypes);
db.Airport = airportModel(sequelize, Sequelize.DataTypes);
db.Flight = flightModel(sequelize, Sequelize.DataTypes);

// 👉 Call associate if available
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
