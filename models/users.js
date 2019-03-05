module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        userName: DataTypes.STRING,
        pWord: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING
    },
        {
            // This is just here to make testing easier, the real database will need to have the createdat and updated at fields if we want them
            timestamps: false
        });

    Users.associate = function (models) {
        models.Users.hasMany(models.Events, {
            onDelete: "Cascade"
        });
    }
    return Users;
};