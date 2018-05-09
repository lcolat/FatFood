module.exports = function (sequelize, DataTypes) {
    const Promotion = sequelize.define('Promotion', {
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
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });
    Promotion.associate = _associate;
    return Promotion;
};

//INTERNAL
function _associate(models) {
    models.Promotion.belongsToMany(models.Menu, {
        as: 'orders',
        foreignKey: 'product_id'
    });
    models.Promotion.belongsToMany(models.Product, {
        as: 'ingredients',
        foreignKey: 'product_id'
    });
}