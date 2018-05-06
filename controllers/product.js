const ModelIndex = require('../models');
const Product = ModelIndex.Product;
const Op = ModelIndex.Sequelize.Op;

const ProductController = function() { };


ProductController.add = function(name, style, description, price) {
    return Product.create({
        name: name,
        style: style,
        description: description,
        price: price
    });
};

ProductController.getAll = function (search, limit, offset) {
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
    return Product.findAll(options);
};

ProductController.delete = function(productId) {
    const options = {};
    const where = {
        id: productId
    };
    options.where = where;
    return Product.destroy(options);
};

module.exports = ProductController;