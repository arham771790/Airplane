import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Airplane extends Model {}

  Airplane.init(
    {
      modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Airplane",
      tableName: "Airplanes", // ✅ Ensure table name matches DB schema
      //timestamps: false, // Remove if you have createdAt/updatedAt columns
    }
  );

  return Airplane;
};
