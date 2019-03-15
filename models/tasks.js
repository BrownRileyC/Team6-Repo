module.exports = function (sequelize, DataTypes) {
    var Tasks = sequelize.define("Tasks", {
        task: DataTypes.STRING,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        type: DataTypes.STRING
    },
    {
        // This is just here to make testing easier, the real database will need to have the createdat and updated at fields if we want them
        timestamps: false
    });

    Tasks.associate = function (models) {
        models.Tasks.belongsTo(models.Events, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Tasks;
};