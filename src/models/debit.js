const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Debit = sequelize.define("Debits",{  
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
    receiverAccount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "Users",
        key: "accountNO",
      },
    },
    receiverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transactionType: {
      type: DataTypes.ENUM("Transfer", "Withdrawal"),
      defaultValue: "Transfer",
    },
  });
  Debit.associate = models => {
  Debit.belongsTo(models.Users, {
      as: "debits",
      foreignKey: "userId",
    });
  };
  return Debit;
};
