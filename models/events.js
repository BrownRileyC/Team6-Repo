module.exports = function (sequelize, DataTypes) {
    var Events = sequelize.define("Example", {
        eventName: DataTypes.STRING,
        eventDate: DataTypes.DATE,
        locationName: DataTypes.STRING,
        score: DataTypes.INTEGER
    });
    
    Events.associate = function (models) {
        models.events.belongsTo(models.Users, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        })
    }

    Events.associate = function (models) {
        models.Events.hasMany(models.Task, {
            onDelete: "Cascade"
        });
    }
    return Events;
};