import { Model, DataTypes } from "sequelize";
import { seatType } from "../utils/common/index.js";
const { BUSSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS } = seatType;

export default (sequelize) => {
  class Seat extends Model {
    static associate(models) {
      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        onDelete: "CASCADE",
      });
    }
  }

  Seat.init(
    {
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      row: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      col: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(BUSSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS),
        defaultValue: ECONOMY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Seat",
    }
  );

  return Seat;
};
