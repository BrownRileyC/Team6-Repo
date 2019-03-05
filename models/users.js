module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        userName: DataTypes.STRING,
        pWord: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING
    });

    Users.associate = function (models) {
        models.Users.hasMany(models.Events, {
            onDelete: "Cascade"
        });
    }
    return Users;
};