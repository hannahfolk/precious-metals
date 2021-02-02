module.exports = (sequelize, DataTypes) => {
  const Alert = sequelize.define("Alert", {
    metal: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        isLowercase: true,
      },
    },
    price: DataTypes.DECIMAL(10, 4),
  });

  Alert.associate = (models) => {
    Alert.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Alert;
};
