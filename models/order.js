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
    models.Order.belongsToMany(models.Product, {
        as: 'product',
        through: 'order_product',
        foreignKey: 'order_id'
    });
}