'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Airplane
      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
        as: 'airplaneDetails', // Alias for airplane association
        onDelete: 'CASCADE',
      });
    
      // Define association with Airport for departure airport
      this.belongsTo(models.Airport, {
        foreignKey: 'departureAirportId',
        as: 'DepartureAirportDetails', // Alias for departure airport
        required: true,
      });
    
      // Define association with Airport for arrival airport
      this.belongsTo(models.Airport, {
        foreignKey: 'arrivalAirportId',
        as: 'ArrivalAirportDetails', // Alias for arrival airport
        required: true,
      });
    }
  }

  Flight.init({
    flightNumber: {
      type: DataTypes.STRING,
      allowNull:false
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Airplanes',
        key:'id'
      }
    },
    departureAirportId: {
      type: DataTypes.STRING,
      allowNull:false
    },
    arrivalAirportId: {
      type: DataTypes.STRING,
      allowNull:false
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull:false
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull:false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    boardingGate: {
      type: DataTypes.STRING,
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });

  return Flight;
};
