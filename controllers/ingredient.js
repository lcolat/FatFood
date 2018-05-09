const ModelIndex = require('../models');
const Ingredient = ModelIndex.Ingredient;
const Op = ModelIndex.Sequelize.Op;

const IngredientController = function() { };


IngredientController.add = function(name, quantity) {
    return Ingredient.create({
        name: name,
        quantity: quantity
    });
};

IngredientController.getAll = function (search, limit, offset) {
    const options = {};
    const where = {};
    if(search !== undefined){
        where.name = {
            [Op.like]: `${search}%`
        };
    }
    options.where = where;
    if(limit !== undefined){
        options.limit = limit;
    }
    if(offset !== undefined){
        options.offset = offset;
    }
    return Ingredient.findAll(options);
};

IngredientController.delete = function(ingredientId) {
    const options = {};
    const where = {
        id: ingredientId
    };
    options.where = where;
    return Ingredient.destroy(options);
};


module.exports = IngredientController;