const ModelIndex = require('../models');
const Menu = ModelIndex.Menu;
const Product = ModelIndex.Product;
const Op = ModelIndex.Sequelize.Op;

const MenuController = function() { };


MenuController.add = function(name, price) {
    return Menu.create({
        name: name,
        price: price
    });
};
MenuController.addProduct = function(id, productId) {
    return Menu.find({
        where: {
            id:id
        }
    }).then((menu) => {
        return Product.find({
            where: {
                id: productId
            }
        })
        .then((product) => {
            return menu.addProduct(product);
        });
    });
};

MenuController.getAll = function (search, limit, offset) {
    const options = {
        include: [{
            model: ModelIndex.Product,
            as: 'products'
        }]
    };
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
    return Menu.findAll(options);
};
MenuController.delete = function(menuId) {
    const options = {};
    const where = {
        id: menuId
    };
    options.where = where;
    return Menu.destroy(options);
};

module.exports = MenuController;