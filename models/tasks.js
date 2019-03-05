module.exports = function(sequelize, DataTypes) {
    var Tasks = sequelize.define("Tasks", {
      task: DataTypes.STRING
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