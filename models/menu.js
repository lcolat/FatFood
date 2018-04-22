module.exports = function (sequelize, DataTypes) {
    const Menu = sequelize.define('Menu', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });
    Menu.associate = _associate;
    return Menu;
};

//INTERNAL
function _associate(models) {
    models.Menu.belongsToMany(models.Product, {
        as: 'products',
        through: 'menu_product',
        foreignKey: 'menu_id'
    });
    // models.Menu.belongsToMany(models.Order, {
    //     as: 'orders',
    //     through: 'order_menu',
    //     foreignKey: 'menu_id'
    // });
}