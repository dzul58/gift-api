'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here 
      this.belongsTo(models.Voucher, {
        foreignKey: "voucherId",
      });
      this.belongsTo(models.User, {
        foreignKey: "senderId",
      });
      this.belongsTo(models.User, {
        foreignKey: "receiverId",
      });
    }
  }
  Gift.init({
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Message is required",
        },
      },
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: DataTypes.INTEGER,
    voucherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Voucher cannot be empty",
        },
      },
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Receiver is required",
        },
      },
    },
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Gift',
  });
  return Gift;
};