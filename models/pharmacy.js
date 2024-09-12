// models/pharmacy.js

module.exports = (sequelize, DataTypes) => {
    const Pharmacy = sequelize.define('Pharmacy', {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING
    });
  
    Pharmacy.associate = function(models) {
      // Define one-to-many relationship
      Pharmacy.hasMany(models.User, {
        foreignKey: 'pharmacyId',
        as: 'users'
      });
    };
  
    return Pharmacy;
  };
  