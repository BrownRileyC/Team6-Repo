module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("Users", {
        userName: DataTypes.STRING,
        pWord: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING}, {
            timestamps: false
    });
  
    User.associate = function (models) {
        models.Users.hasMany(models.Events, {
            onDelete: "Cascade"
        });
    };
    return User;
  };
