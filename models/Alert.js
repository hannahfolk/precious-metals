module.exports = function(sequelize, DataTypes) {
    const Alert = sequelize.define("Alert", {
      metal: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          isLowercase: true
        }
      },
      price: DataTypes.DECIMAL(10, 4)
    });

    return Alert;
  };