module.exports = function (sequelize, DataTypes) {
    const Order_menu = sequelize.define('Order', {
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
    Order_menu.associate = _associate;
    return Order_menu;
};

//INTERNAL
function _associate(models) {
    models.Order_menu.belongsToMany(models.Order, {
        as: 'orders',
        foreignKey: 'menu_id'
    });
}