module.exports = function (sequelize, DataTypes) {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });
    Order.associate = _associate;
    return Order;
};

//INTERNAL
function _associate(models) {
    models.Order.hasMany(models.Sandwich, {
        as: 'sandwich'
    });
}