module.exports = function (sequelize, DataTypes) {
    const Sandwich = sequelize.define('Sandwich', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });
    Sandwich.associate = _associate;
    return Sandwich;
};

//INTERNAL
function _associate(models) {
    models.Sandwich.belongsTo(models.Order);
}