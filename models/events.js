module.exports = function (sequelize, DataTypes) {
    var Events = sequelize.define("Events", {
        eventName: DataTypes.STRING,
        eventDate: DataTypes.DATE,
        locationName: DataTypes.STRING,
        score: DataTypes.INTEGER
    });

    Events.associate = function (models) {
        models.Events.belongsTo(models.Users, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        })
    }

    Events.associate = function (models) {
        models.Events.hasMany(models.Tasks, {
            onDelete: "Cascade"
        });
    }
    return Events;
};