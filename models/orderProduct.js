module.exports = function (sequelize, DataTypes) {
    const OrderProduct = sequelize.define('order_product', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });
    return OrderProduct;
};