module.exports = function (sequelize, DataTypes) {
    const Ingredient = sequelize.define('Ingredient', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.BIGINT,
            allowNull:false
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });
    Ingredient.associate = _associate;
    return Ingredient;
};

//INTERNAL
function _associate(models) {
    models.Ingredient.belongsToMany(models.Product, {
        as: 'products',
        through: 'product_ingredient',
        foreignKey: 'ingredient_id'
    });
}