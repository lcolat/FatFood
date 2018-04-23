module.exports = function (sequelize, DataTypes) {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: false
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
        as: 'products',
        through: 'order_product',
        foreignKey: 'order_id'
    });
    models.Order.belongsToMany(models.Menu, {
        as: 'menus',
        through: 'order_menu',
        foreignKey: 'order_id'
    });
}