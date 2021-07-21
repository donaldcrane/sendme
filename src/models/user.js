const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("Users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    globalBalance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  User.associate = models => {
    User.hasOne(models.Profiles, {
      as: "profiles",
      foreignKey: "userId",
      onDelete: "cascade",
      hooks: true,
    });
    User.hasMany(models.Credits, {
      as: "credits",
      foreignKey: "userId",
      onDelete: "cascade",
      hooks: true,
    });
    User.hasMany(models.Debits, {
      as: "debits",
      foreignKey: "userId",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return User;
};

