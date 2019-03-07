module.exports = function (sequelize, DataTypes) {
    var Events = sequelize.define("Events", {
        eventName: DataTypes.STRING,
        eventDate: DataTypes.STRING,
        locationName: DataTypes.STRING,
        eventType: DataTypes.STRING,
        score: {
            type: DataTypes.INTEGER,
            defaultValue: null
        }
    },
    {
        // This is just here to make testing easier, the real database will need to have the createdat and updated at fields if we want them
        timestamps: false
    });

    Events.associate = function (models) {
        models.Events.belongsTo(models.Users, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        })
        models.Events.hasMany(models.Tasks, {
                    onDelete: "Cascade"
                });
    }
    return Events;
};