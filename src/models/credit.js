const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Credit = sequelize.define("Credits",{  
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      unique: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transactionType: {
      type: DataTypes.ENUM("Transfer", "Deposit"),
      defaultValue: "Deposit",
    },
    senderName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  Credit.associate = models => {
  Credit.belongsTo(models.Users, {
      as: "credits",
      foreignKey: "userId",
    });
  };
  return Credit;
};
