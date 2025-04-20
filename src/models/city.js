import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class City extends Model {
    static associate(models) {
      // define associations here, if needed
    }
  }

  City.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlpha: true, // Optional: only allow alphabetic characters
        },
      },
    },
    {
      sequelize,
      modelName: "City",
      tableName: "Cities", // Optional: make explicit if table name differs
      //timestamps: false, // Uncomment if you do not want createdAt/updatedAt
    }
  );

  return City;
};
