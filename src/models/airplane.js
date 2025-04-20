import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Airplane extends Model {}

  Airplane.init(
    {
      modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isAlphanumeric:true
        }
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: 1000, // Example validation
        },
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
