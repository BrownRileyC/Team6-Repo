module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Example", {
        userName: DataTypes.STRING,
        pWord: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING
    });

    Users.associate = function (models) {
        models.Events.hasMany(models.Task, {
            onDelete: "Cascade"
        });
    }
    return Users;
};