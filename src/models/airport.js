'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City,{
        foreignKey:'cityID',
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
      })
    }
  }

  Airport.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: DataTypes.STRING,
    cityID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });

  return Airport;
};
