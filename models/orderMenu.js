module.exports = function (sequelize, DataTypes) {
    const OrderMenu = sequelize.define('order_menu', {
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
    return OrderMenu;
};
