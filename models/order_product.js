module.exports = function (sequelize, DataTypes) {
    const Order_product = sequelize.define('Order', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });
    Order_product.associate = _associate;
    return Order_product;
};

//INTERNAL
function _associate(models) {
    models.Order_product.belongsToMany(models.Product, {
        as: 'products',
        through: {model:'Order_product'},
        foreignKey: 'order_id'
    });
}