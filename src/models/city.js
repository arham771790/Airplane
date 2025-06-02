import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class City extends Model {
    static associate(models) {
      
      this.hasMany(models.Airport,{
        foreignKey:'cityID',
        onDelete:'CASCADE',
      })
    }
  }

  City.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlpha: true,
        },
      },
    },
    {
      sequelize,
      modelName: "City",
      tableName: "Cities",
      
    }
  );

  return City;
};
