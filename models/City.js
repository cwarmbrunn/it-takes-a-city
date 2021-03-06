const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// this is the City model
class City extends Model {}

City.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stateName: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: "city"
});

module.exports = City;
