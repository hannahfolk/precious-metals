module.exports = function(sequelize, DataTypes) {
    const Metal = sequelize.define("Metal", {
      createdAt: { type: DataTypes.DATE, primaryKey: true },
      gold: DataTypes.DECIMAL(10, 4),
      silver: DataTypes.DECIMAL(10, 4),
      platinum: DataTypes.DECIMAL(10, 4),
      palladium: DataTypes.DECIMAL(10, 4),
      rhodium: DataTypes.DECIMAL(10, 4)
    });

    return Metal;
  };
  